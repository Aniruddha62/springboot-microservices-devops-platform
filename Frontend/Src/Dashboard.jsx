import React, { useEffect, useState } from 'react';
import { employeeService, departmentService } from '../services/api';

const StatCard = ({ title, value, color, icon }) => (
  <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem', border: '1px solid #334155', flex: 1 }}>
    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
    <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{title}</div>
    <div style={{ color, fontSize: '2.2rem', fontWeight: 'bold', marginTop: '0.25rem' }}>{value}</div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ totalEmployees: 0, activeEmployees: 0 });
  const [deptCount, setDeptCount] = useState(0);

  useEffect(() => {
    employeeService.stats().then(r => setStats(r.data)).catch(() => {});
    departmentService.getAll().then(r => setDeptCount(r.data.length)).catch(() => {});
  }, []);

  return (
    <div style={{ background: '#0f172a', minHeight: 'calc(100vh - 60px)', padding: '2rem', color: '#fff' }}>
      <h1 style={{ color: '#f1f5f9', marginBottom: '0.5rem' }}>Dashboard</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Employee Management & Deployment Platform</p>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <StatCard title="Total Employees" value={stats.totalEmployees} color="#38bdf8" icon="👥" />
        <StatCard title="Active Employees" value={stats.activeEmployees} color="#4ade80" icon="✅" />
        <StatCard title="Departments" value={deptCount} color="#a78bfa" icon="🏢" />
        <StatCard title="Services Running" value="2/2" color="#fb923c" icon="⚡" />
      </div>

      <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem', border: '1px solid #334155' }}>
        <h2 style={{ color: '#f1f5f9', marginBottom: '1rem' }}>System Status</h2>
        {[
          { name: 'Employee Service', port: ':8081', status: 'Running' },
          { name: 'Department Service', port: ':8082', status: 'Running' },
          { name: 'PostgreSQL', port: ':5432', status: 'Running' },
          { name: 'Prometheus', port: ':9090', status: 'Running' },
          { name: 'Grafana', port: ':3001', status: 'Running' },
        ].map(s => (
          <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #0f172a' }}>
            <span style={{ color: '#cbd5e1' }}>{s.name} <span style={{ color: '#475569' }}>{s.port}</span></span>
            <span style={{ color: '#4ade80', fontWeight: 'bold' }}>● {s.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
