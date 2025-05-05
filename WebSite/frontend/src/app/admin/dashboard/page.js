"use client";

import { useEffect, useState } from "react";
import AttendanceTable from "@/components/AttendanceTable";
import AttendanceChart from "@/components/AttendanceChart"; // ✅ New
import { fetchAttendance } from "@/lib/api";

export default function AdminDashboard() {
  const [filters, setFilters] = useState({ name: "", date: "", status: "" });
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAttendance(filters)
      .then((data) => {
        setAttendance(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch:", err);
        setLoading(false);
      });
  }, [filters]);

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AttendanceChart data={attendance} />
          <AttendanceTable data={attendance} />
        </>
      )}
    </div>
  );
}

