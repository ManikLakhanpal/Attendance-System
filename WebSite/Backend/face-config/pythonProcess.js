import { fileURLToPath } from "url";
import { dirname } from "path";
import { spawn } from "child_process";
import { db } from "../config/database.js";
import mailSender from "../utils/mailSender.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function faceRecognition(uid, VerifiedName, email) {
  const pythonProcess = spawn("python", [
    `${__dirname}/face-recognition/main.py`,
  ]);

  console.log(`${__dirname}/face-recognition/main.py`);

  const timeout = 70000;
  const timeoutHandle = setTimeout(() => {
    console.log(`~[SERVER]: Process timed out after 7 seconds for user '${VerifiedName}' uid '${uid}'`);
    pythonProcess.kill("SIGTERM");
  }, timeout);

  pythonProcess.stdout.on("data", async (data) => {
    clearTimeout(timeoutHandle);

    const name = data.toString().trim();

    if (name === VerifiedName) {
      const time = new Date();

      try {
        await db.query(`CALL add_attendance($1)`, [uid]);

        mailSender(email, "You got verified", `Attendance updated successfully at ${time}`);
        console.log(`~[SERVER]: ${name} with uid '${uid}' just got 'verified' at ${time}\n`);
      } catch (error) {
        console.error(`~[SERVER]: Error logging attendance: ${error.message}`);
      }

    } else {
      try {
        const time = new Date();

        // Get UID of proxy giver by name
        const result = await db.query(`SELECT uid FROM users WHERE name = $1`, [name]);

        if (result.rows.length === 0) {
          console.error(`~[SERVER]: No user found with name '${name}'`);
          return;
        }

        const proxyGiverUid = result.rows[0].uid;

        // Insert into proxy table
        await db.query(
          `INSERT INTO proxy (proxy_giver, proxy_receiver) VALUES ($1, $2)`,
          [proxyGiverUid, uid]
        );

        mailSender(email, "Proxy detected", `Proxy at ${time} by ${name} for ${VerifiedName}`);
        console.log(`![SERVER]: Proxy done by '${name}' (uid: ${proxyGiverUid}) for '${VerifiedName}' (uid: ${uid})`);
      } catch (error) {
        console.error(`~[SERVER]: Error logging proxy: ${error.message}`);
      }
    }
  });
}