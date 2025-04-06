import { FaUserCheck, FaSearch } from "react-icons/fa";
import ClientDate from "./ClientDate";
import { useState } from "react";

export default function AttendanceTable({ data }) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No attendance records found.
      </p>
    );
  }

  const filteredData = data.filter((att) =>
    [att.name, att.email, att.uid, att.batch]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-8">
        <FaUserCheck className="text-blue-600 text-3xl mb-2 animate-bounce" />
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Attendance Records
        </h2>
      </div>

      {/* Search */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, UID, batch..."
            className="w-full pl-10 pr-4 py-2 dark:text-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-blue-600 text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-4 text-left font-semibold rounded-l-xl w-1/5">Name</th>
              <th className="px-4 py-4 text-left font-semibold w-1/5">Email</th>
              <th className="px-4 py-4 text-left font-semibold w-1/5">UID</th>
              <th className="px-4 py-4 text-left font-semibold w-1/5">Batch</th>
              <th className="px-4 py-4 text-left font-semibold rounded-r-xl w-1/5">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((att, index) => (
              <tr
                key={`${att.uid}-${index}`}
                className="bg-white hover:bg-blue-50 transition transform hover:scale-[1.01] duration-200 shadow-md border-t"
              >
                <td className="px-4 py-4 flex items-center gap-2 font-medium text-gray-900">
                  <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold">
                    {att.name.charAt(0).toUpperCase()}
                  </div>
                  {att.name}
                </td>
                <td className="px-4 py-4 text-blue-700 hover:underline cursor-pointer">
                  <a href={`mailto:${att.email}`}>{att.email}</a>
                </td>
                <td className="px-4 py-4">
                  <span className="bg-gray-100 px-2 py-1 rounded-full font-mono text-gray-700 text-xs">
                    {att.uid}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                    {att.batch}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-700">
                  <ClientDate dateString={att.type} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
