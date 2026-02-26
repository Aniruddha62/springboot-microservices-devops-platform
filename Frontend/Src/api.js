import axios from 'axios';

const empApi = axios.create({ baseURL: 'http://localhost:8081' });
const deptApi = axios.create({ baseURL: 'http://localhost:8082' });

// Attach JWT token to every request
[empApi, deptApi].forEach(instance => {
  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = 'Bearer ' + token;
    return config;
  });
});

export const authService = {
  login: (data) => empApi.post('/api/auth/login', data),
  register: (data) => empApi.post('/api/auth/register', data),
};

export const employeeService = {
  getAll: () => empApi.get('/api/employees'),
  getById: (id) => empApi.get('/api/employees/' + id),
  create: (data) => empApi.post('/api/employees', data),
  update: (id, data) => empApi.put('/api/employees/' + id, data),
  delete: (id) => empApi.delete('/api/employees/' + id),
  search: (keyword) => empApi.get('/api/employees/search?keyword=' + keyword),
  stats: () => empApi.get('/api/employees/stats'),
};

export const departmentService = {
  getAll: () => deptApi.get('/api/departments'),
  getById: (id) => deptApi.get('/api/departments/' + id),
  create: (data) => deptApi.post('/api/departments', data),
  update: (id, data) => deptApi.put('/api/departments/' + id, data),
  delete: (id) => deptApi.delete('/api/departments/' + id),
};
