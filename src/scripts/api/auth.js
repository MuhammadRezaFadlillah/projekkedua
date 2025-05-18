// src/api/auth.js
import { BASE_URL } from './config';  // Menggunakan './config' jika berada di folder yang sama


const AuthApi = {
  async login(email, password) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return data.loginResult;
  },

  async register(name, email, password) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return data;
  },
};

export default AuthApi;
