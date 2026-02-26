import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const links = [
    { path: '/', label: 'Dashboard' },
    { path: '/employees', label: 'Employees' },
    { path: '/departments', label: 'Departments' },
  ];

  const styles = {
    nav: { background: '#1e293b', padding: '0 2rem', display: 'flex', alignItems: 'center', height: '60px', justifyContent: 'space-between' },
    brand: { color: '#38bdf8', fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'none' },
    links: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
    link: (active) => ({ color: active ? '#38bdf8' : '#cbd5e1', textDecoration: 'none', fontWeight: active ? 'bold' : 'normal', padding: '0.25rem 0', borderBottom: active ? '2px solid #38bdf8' : '2px solid transparent' }),
    logout: { background: '#e11d48', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>EMP Platform</Link>
      <div style={styles.links}>
        {links.map(l => (
          <Link key={l.path} to={l.path} style={styles.link(location.pathname === l.path)}>{l.label}</Link>
        ))}
        <button style={styles.logout} onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
