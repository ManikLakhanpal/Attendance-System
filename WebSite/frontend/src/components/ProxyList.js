// src/components/ProxyList.js

import React from 'react';

const ProxyList = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No proxy records found.</p>;
  }

  return (
    <div className="proxy-list">
      <h2>Proxy Records</h2>
      <table>
        <thead>
          <tr>
            <th>Giver Name</th>
            <th>Giver UID</th>
            <th>Giver Email</th>
            <th>Receiver Name</th>
            <th>Receiver UID</th>
            <th>Receiver Email</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((proxy, index) => (
            <tr key={index}>
              <td>{proxy.giver_name}</td>
              <td>{proxy.giver_uid}</td>
              <td>{proxy.giver_email}</td>
              <td>{proxy.receiver_name}</td>
              <td>{proxy.receiver_uid}</td>
              <td>{proxy.receiver_email}</td>
              <td>{new Date(proxy.time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProxyList;
