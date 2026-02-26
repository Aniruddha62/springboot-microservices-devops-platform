import React, { useEffect, useState } from 'react';
import { departmentService } from '../services/api';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', managerName: '', location: '' });

  const load = () => departmentService.getAll().then(r => setDepartments(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await departmentService.create(form);
      setShowForm(false);
      setForm({ name: '', description: '', managerName: '', location: '' });
      load();
    } catch (e) { alert('Error creating department'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this department?')) {
      await departmentService.delete(id);
      load();
    }
  };

  const s = {
    page: { background: '#0f172a', minHeight: 'calc(100vh - 60px)', padding: '2rem', color: '#fff' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' },
    card: { background: '#1e293b', borderRadius: '10px', padding: '1.5rem', border: '1px solid #334155' },
    btn: (c) => ({ background: c, color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }),
    modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
    form: { background: '#1e293b', borderRadius: '12px', padding: '2rem', width: '400px' },
    label: { color: '#94a3b8', display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' },
    fi: { width: '100%', padding: '0.6rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff', marginBottom: '1rem', boxSizing: 'border-box' }
  };

  return (
    <div style={s.page}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#f1f5f9' }}>Departments</h1>
        <button style={s.btn('#0ea5e9')} onClick={() => setShowForm(true)}>+ Add Department</button>
      </div>

      <div style={s.grid}>
        {departments.map(dept => (
          <div key={dept.id} style={s.card}>
            <h3 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>{dept.name}</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{dept.description}</p>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Manager: <span style={{ color: '#cbd5e1' }}>{dept.managerName || 'N/A'}</span></p>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Location: <span style={{ color: '#cbd5e1' }}>{dept.location || 'N/A'}</span></p>
            <button onClick={() => handleDelete(dept.id)} style={{ ...s.btn('#e11d48'), marginTop: '1rem', padding: '0.3rem 0.8rem', fontSize: '0.85rem' }}>Delete</button>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={s.modal}>
          <div style={s.form}>
            <h2 style={{ color: '#f1f5f9', marginBottom: '1.5rem' }}>Add Department</h2>
            <form onSubmit={handleCreate}>
              {[['name','Department Name'],['description','Description'],['managerName','Manager Name'],['location','Location']].map(([k,l]) => (
                <div key={k}>
                  <label style={s.label}>{l}</label>
                  <input style={s.fi} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} required={k==='name'} />
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={s.btn('#0ea5e9')}>Save</button>
                <button type="button" style={s.btn('#475569')} onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
