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
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return user && token;
  },

  getUser() {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  },

  getProfile: async (userId) => {
    try {
      if (!userId) {
        throw new Error('Missing userId parameter');
      }

      // const token = localStorage.getItem('token');
      // if (!token) {
      //   throw new Error('User not authenticated');
      // }

      const response = await axios.get(`${BASE_URL}${authEndpoints.profile(userId)}`, {
        headers: {
          'Content-Type': 'application/json',

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
  },
  uploadProfileImage: async (userId, imageData) => {
    try {
      if (!userId) {
        return 'Missing userId parameter';
      }

      const token = localStorage.getItem('token')
      if (!token) {
        return 'the server could not authenticate your request';
      }


      const response = await axios.post(`${BASE_URL}${authEndpoints.uploadProfileImage(userId)}`, imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`

        },
      });

      if (response.data.success) {
        console.log(response.data.data);
        return response.data.message;
      } else {
        return response.data.message || 'Failed to upload profile image';
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      return error.response.data.error || 'An error occurred';
    }
  },
  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return 'No token found in session storage';
      }

      await axios.post(`${BASE_URL}${authEndpoints.logout}`, null, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Remove the token from session storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // You can also perform any other necessary cleanup, such as clearing the user's data from the application state
    } catch (error) {
      console.error('Error logging out:', error);
      return error.response.data.error || 'An error occurred during logout';
    }
  },
  updateProfile: async (userId, profileData) => {
    try {
      if (!userId) {
        throw new Error('Missing userId parameter');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      profileData.user_id = userId

      console.log(userId);
      console.log(profileData.user_id)

      console.log(profileData)
      const response = await axios.put(`${BASE_URL}${authEndpoints.updateProfile(userId)}`, profileData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        return response.data.message;
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      throw error;
    }
  },

  deleteAccount: async (userId) => {
    try {
      if (!userId) {
        throw new Error('Missing userId parameter');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      console.log(userId);

      const response = await axios.delete(`${BASE_URL}${authEndpoints.deleteAccount(userId)}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        return response.data.message;
      } else {
        throw new Error('Failed to delete profile');
      }
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      if (!userId) {
        throw new Error('Missing userId parameter');
      }
  
      if (!userData) {
        throw new Error('Missing userData parameter');
      }
  
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }
  
      const response = await axios.put(`${BASE_URL}${authEndpoints.updateProfile(userId)}`, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      throw error;
    }
  }, 
};

export default AuthService;