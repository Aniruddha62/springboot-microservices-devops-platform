import React, { useState } from 'react';
import { authService } from '../services/api';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authService.login(form);
      onLogin(res.data.token);
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: { minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    card: { background: '#1e293b', padding: '2.5rem', borderRadius: '12px', width: '380px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' },
    title: { color: '#38bdf8', textAlign: 'center', marginBottom: '2rem', fontSize: '1.6rem' },
    label: { color: '#94a3b8', display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' },
    input: { width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '1rem', marginBottom: '1.2rem', boxSizing: 'border-box' },
    btn: { width: '100%', padding: '0.85rem', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' },
    error: { color: '#f87171', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Employee Management</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Username</label>
          <input style={styles.input} value={form.username} onChange={e => setForm({...form, username: e.target.value})} placeholder="Enter username" required />
          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Enter password" required />
          <button style={styles.btn} type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        <p style={{ color: '#64748b', textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
          Default: admin / admin123
        </p>
      </div>
    </div>
  );
};

export default Login;
