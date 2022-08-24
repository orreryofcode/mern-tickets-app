import axios from "axios";

const API_URL = "/api/users/";

// Register a new user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Log user in
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Log User Out
const logout = async () => {
  await localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
