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
  console.log(API_URL);
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

// Forgot password

const forgot = async (userData) => {
  const response = await axios.post(API_URL + "forgot-password", userData);
  // localStorage.removeItem("user");
  return response.data;
};

// Verify user and reset password
const verify = async (userData) => {
  const response = await axios.put(
    API_URL + `forgot-password/${userData.token}`,
    userData
  );

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  forgot,
  verify,
};

export default authService;
