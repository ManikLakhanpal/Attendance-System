'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AttendanceList from '@/components/AttendanceList';
import ProxyList from '@/components/ProxyList';
import WelcomePage from '@/components/WelcomePage';
import './dashboard.css';

const AdminDashboard = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [proxyData, setProxyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('http://localhost:5000/attendance');
        if (!res.ok) throw new Error('Failed to fetch attendance');
        const data = await res.json();
        setAttendanceData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchProxies = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('http://localhost:5000/proxy');
        if (!res.ok) throw new Error('Failed to fetch proxies');
        const data = await res.json();
        setProxyData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (activePage === 'attendance') {
      fetchAttendance();
    } else if (activePage === 'proxies') {
      fetchProxies();
    }
  }, [activePage]);

  const handleNavbarClick = (page) => {
    setActivePage(page);
  };

  const handleDelete = async (uid, id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await fetch(`http://localhost:5000/attendance`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, id }),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error('Error response:', errorResponse);
          throw new Error('Failed to delete record');
        }

        setAttendanceData(prevData => prevData.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p className="error">{error}</p>;
    }

    switch (activePage) {
      case 'dashboard':
        return <WelcomePage />;
      case 'attendance':
        return <AttendanceList data={attendanceData} onDelete={handleDelete} />;
      case 'proxies':
        return <ProxyList data={proxyData} />;
      default:
        return <WelcomePage />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <Navbar onNavbarClick={handleNavbarClick} />
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
