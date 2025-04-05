// src/lib/api.js

export async function fetchAttendance() {
    const res = await fetch("http://localhost:5000/attendance", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch attendance");
    }

    return res.json();
}
