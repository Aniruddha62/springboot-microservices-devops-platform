import React, { useEffect, useState } from 'react';
import { employeeService, departmentService } from '../services/api';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', position: '', departmentId: '', salary: '' });

  const load = async () => {
    setLoading(true);
    try {
      const [empRes, deptRes] = await Promise.all([employeeService.getAll(), departmentService.getAll()]);
      setEmployees(empRes.data);
      setDepartments(deptRes.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await employeeService.create({ ...form, departmentId: Number(form.departmentId), salary: Number(form.salary) });
      setShowForm(false);
      setForm({ firstName: '', lastName: '', email: '', position: '', departmentId: '', salary: '' });
      load();
    } catch (e) { alert('Error creating employee'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this employee?')) {
      await employeeService.delete(id);
      load();
    }
  };

  const getDeptName = (id) => departments.find(d => d.id === id)?.name || 'N/A';

  const filtered = employees.filter(e =>
    e.firstName.toLowerCase().includes(search.toLowerCase()) ||
    e.lastName.toLowerCase().includes(search.toLowerCase())
  );

  const s = {
    page: { background: '#0f172a', minHeight: 'calc(100vh - 60px)', padding: '2rem', color: '#fff' },
    input: { padding: '0.6rem 1rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '0.95rem' },
    btn: (color) => ({ background: color, color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }),
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' },
    th: { padding: '0.75rem', textAlign: 'left', background: '#1e293b', color: '#94a3b8', borderBottom: '2px solid #334155' },
    td: { padding: '0.75rem', borderBottom: '1px solid #1e293b', color: '#e2e8f0' },
    modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
    form: { background: '#1e293b', borderRadius: '12px', padding: '2rem', width: '420px' },
    label: { color: '#94a3b8', display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' },
    fi: { width: '100%', padding: '0.6rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff', marginBottom: '1rem', boxSizing: 'border-box' }
  };

  return (
    <div style={s.page}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#f1f5f9' }}>Employees</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input style={s.input} placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} />
          <button style={s.btn('#0ea5e9')} onClick={() => setShowForm(true)}>+ Add Employee</button>
        </div>
      </div>

      {loading ? <p style={{ color: '#64748b' }}>Loading...</p> : (
        <table style={s.table}>
          <thead>
            <tr>{['Name','Email','Position','Department','Salary','Status','Actions'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map(emp => (
              <tr key={emp.id}>
                <td style={s.td}>{emp.firstName} {emp.lastName}</td>
                <td style={s.td}>{emp.email}</td>
                <td style={s.td}>{emp.position}</td>
                <td style={s.td}>{getDeptName(emp.departmentId)}</td>
                <td style={{...s.td, color: '#4ade80'}}>${emp.salary?.toLocaleString()}</td>
                <td style={s.td}>
                  <span style={{ color: emp.status === 'ACTIVE' ? '#4ade80' : '#f87171', background: emp.status === 'ACTIVE' ? '#052e16' : '#2d0a0a', padding: '2px 8px', borderRadius: '999px', fontSize: '0.8rem' }}>{emp.status}</span>
                </td>
                <td style={s.td}>
                  <button onClick={() => handleDelete(emp.id)} style={{ background: '#e11d48', color: '#fff', border: 'none', padding: '0.25rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div style={s.modal}>
          <div style={s.form}>
            <h2 style={{ color: '#f1f5f9', marginBottom: '1.5rem' }}>Add New Employee</h2>
            <form onSubmit={handleCreate}>
              {[['firstName','First Name'],['lastName','Last Name'],['email','Email'],['position','Position'],['salary','Salary']].map(([k,l]) => (
                <div key={k}>
                  <label style={s.label}>{l}</label>
                  <input style={s.fi} value={form[k]} onChange={e => setForm({...form, [k]: e.target.value})} required />
                </div>
              ))}
              <label style={s.label}>Department</label>
              <select style={s.fi} value={form.departmentId} onChange={e => setForm({...form, departmentId: e.target.value})} required>
                <option value="">Select department</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
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

export default Employees;
