const express = require("express");
const router = express.Router();
const {
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controller/ticketsController");
const { protect } = require("../middleware/authenticate");

// Handle GET and POST requests
router.route("/").get(protect, getTicket).post(protect, createTicket);

// Handle PUT and DELETE requests
router.route("/:id").put(protect, updateTicket).delete(protect, deleteTicket);

module.exports = router;
