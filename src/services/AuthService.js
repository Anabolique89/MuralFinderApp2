import axios from "axios";
import { BASE_URL, authEndpoints } from "../constants/ApiEndpoints";

const AuthService = {
  login: async (email, password) => {
    try {
      const inputObj = { email, password };

      const response = await fetch(`${BASE_URL}${authEndpoints.login}`, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(inputObj)
      });

      const data = await response.json();

      if (response.ok) {
        const dataObj = data.data;
        return { user: dataObj.user, token: dataObj.token };
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      throw err;
    }
  },

  signup: async (username, email, role, password, passwordConfirmation) => {
    try {
      const inputObj = {
        username,
        email,
        role,
        password,
        password_confirmation: passwordConfirmation
      };

      const response = await fetch(`${BASE_URL}${authEndpoints.register}`, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(inputObj)
      });

      const data = await response.json();

      if (response.ok) {
        return { message: data.message };
      } else {
        if (data && typeof data === 'object' && data.message && typeof data.message === 'object') {
          let errorString = '';

          for (const key in data.message) {
            if (Array.isArray(data.message[key])) {
              errorString += data.message[key].join(' ') + ' ';
            }
          }

          throw new Error(errorString.trim());
        } else {
          console.log(data);
          throw new Error('An error occurred during signup.');
        }
      }
    } catch (err) {
      throw err;
    }
  },

  isAuthenticated() {
    const user = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    return user && token;
  },

  getUser() {
    const userString = sessionStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  },

  getProfile: async (userId) => {
    try {
      if (!userId) {
        throw new Error('Missing userId parameter');
      }

      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.get(`${BASE_URL}${authEndpoints.profile(userId)}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

      if (response.status === 200) {
        return response.data.data; 
      } else {
        throw new Error('Failed to fetch profile data');
      }
    } catch (err) {
      throw err; 
    }
  }
};

export default AuthService;