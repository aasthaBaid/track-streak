// This simulates a backend authentication service
// In a real application, this would make API calls to your backend
const API_URL = 'http://localhost:5000/api';
const TOKEN_KEY = 'streak_tracker_token';
const USER_KEY = 'streak_tracker_user';
// Simulated user data for demo purposes
const demoUsers = [{
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  password: 'password123'
}];
export const loginUser = async (email: string, password: string) => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = demoUsers.find(u => u.email === email && u.password === password);
      if (user) {
        // Create a token (this would be JWT in a real app)
        const token = `demo-token-${Date.now()}`;
        // Store token and user in localStorage
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email
        }));
        resolve({
          id: user.id,
          name: user.name,
          email: user.email
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
};
export const registerUser = async (name: string, email: string, password: string) => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if user already exists
      const existingUser = demoUsers.find(u => u.email === email);
      if (existingUser) {
        reject(new Error('User with this email already exists'));
        return;
      }
      // Create new user
      const newUser = {
        id: `${demoUsers.length + 1}`,
        name,
        email,
        password
      };
      demoUsers.push(newUser);
      // Create a token (this would be JWT in a real app)
      const token = `demo-token-${Date.now()}`;
      // Store token and user in localStorage
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }));
      resolve({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      });
    }, 500);
  });
};
export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
export const getCurrentUser = async () => {
  return new Promise(resolve => {
    const userData = localStorage.getItem(USER_KEY);
    if (userData) {
      resolve(JSON.parse(userData));
    } else {
      resolve(null);
    }
  });
};
export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};