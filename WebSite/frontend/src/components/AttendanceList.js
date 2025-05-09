import React from 'react';

const AttendanceList = ({ data, onDelete }) => {
  if (!data || data.length === 0) {
    return <p>No attendance records found.</p>;
  }

  const handleDelete = (uid, id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      onDelete(uid, id); // Call onDelete function passed from parent
    }
  };

  return (
    <div className="attendance-list">
      <h2>Attendance Records</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>UID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Batch</th>
            <th>Type</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record.id}>
              <td>{record.uid}</td>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.batch}</td>
              <td>{record.type}</td>
              <td>{new Date(record.time).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(record.uid, record.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
