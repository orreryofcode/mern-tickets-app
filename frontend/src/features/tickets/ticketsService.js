import axios from "axios";

// const API_URL = "/api/tickets";

// Create new ticket
const createTicket = async (ticketData, token) => {
  // Header creation
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(_, ticketData, config);
  return response.data.ticket;
};

// Get tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(_, config);

  return response.data;
};

const authService = {
  createTicket,
  getTickets,
};

export default authService;
