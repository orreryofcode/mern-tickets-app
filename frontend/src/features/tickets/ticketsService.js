import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL =
  "https://mern-tickets-app-production.up.railway.app/api/tickets";

// Create new ticket
const createTicket = async (ticketData, token) => {
  // Header creation
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);
  return response.data.ticket;
};

// Get tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const authService = {
  createTicket,
  getTickets,
};

export default authService;
