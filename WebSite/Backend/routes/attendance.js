import { Router } from "express";
import faceRecognition from "../face-config/pythonProcess.js";
import { db } from "../config/database.js";

const attendanceRoutes = Router();

// * This allows to get all attendance
attendanceRoutes.get("/attendance", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT users.uid, name, email, batch, time, id, type FROM attendance
      LEFT JOIN users ON users.uid = attendance.uid;
      `);

    return res.status(200).send(result.rows);
  } catch (error) {
    console.error(`Server: errro while retrieving attendance ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

attendanceRoutes.delete("/attendance", async (req, res) => {
  try {
    const { uid, id } = req.body;

    console.log(req.body);

    console.log("Received UID:", uid);
    console.log("Received ID:", id);

    // * 1. Check if the Attendance exists or not
    const result = await db.query(
      `
      SELECT users.uid, name, email, batch, time, type FROM attendance
      LEFT JOIN users ON users.uid = attendance.uid
      WHERE users.uid = $1 AND attendance.id = $2;
      `,
      [uid, id]
    );

    // * 2. If attendance exists try to delete it
    if (result.rowCount > 0) {
      await db.query(
        `
        DELETE FROM attendance
        WHERE uid = $1 AND id = $2;
        `,
        [uid, id]
      );
      return res
        .status(200)
        .json({ message: "Attendance deleted successfully" });
    } else {
      return res.status(404).json({ error: "Attendance not found" });
    }
  } catch (error) {
    console.error(`Server: error while retrieving attendance ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

// * This route is to mark the attendance
attendanceRoutes.post("/", async (req, res) => {
  // * Extract uid from the JSON payload
  const { uid } = req.body;

  // ! If no uid given
  if (!uid) {
    console.log(`Invalid request received at ${new Date()}`);
    return res.status(400).json({ error: "UID is required" });
  }

  const result = await db.query(
    `SELECT * FROM users WHERE uid = $1 AND type = 'student'`,
    [uid]
  );

  // * 1. Check if user id is valid
  if (result.rowCount == 0) {
    console.log(`![SERVER] : Invalid UID ${uid} was passed at ${new Date()}`);
    return res.json({ message: "Invalid user id" });
  }

  console.log(`Received UID: ${uid} at ${new Date()}`);

  // * 2. Verify using python face recognition
  faceRecognition(uid, result.rows[0].name, result.rows[0].email);

  res.json({
    message: `Status will be sent to the user through registered Email`,
  });
});

// * This route gets all the proxis
attendanceRoutes.get("/proxy", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        g.name AS giver_name,
        g.uid AS giver_uid,
        g.email AS giver_email,
        r.name AS receiver_name,
        r.uid AS receiver_uid,
        r.email AS receiver_email,
        p.time
      FROM proxy p
      LEFT JOIN users g ON g.uid = p.proxy_giver
      LEFT JOIN users r ON r.uid = p.proxy_receiver
      ORDER BY p.time DESC;
    `);

    return res.status(200).send(result.rows);
  } catch (error) {
    console.error(`Server: error while retrieving proxy logs: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

export default attendanceRoutes;
