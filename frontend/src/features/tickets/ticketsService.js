import axios from "axios";

const API_URL = "mern-tickets-ig5dpg2lj-orreryofcode.vercel.app/api/tickets";

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
