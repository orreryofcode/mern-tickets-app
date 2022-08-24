const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketsModel");
const User = require("../models/usersModel");

// desc:      Retrieve all tickets
// method:    GET
// route:     '/api/tickets'
const getTicket = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// desc:      Create a ticket
// method:    POST
// route:     '/api/tickets'
const createTicket = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.description) {
    res.status(400);
    throw new Error("Please include a title and description");
  }

  const ticket = await Ticket.create({
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
    status: "Open",
    solved: false,
  });

  res.status(200).json({
    ticket,
  });
});

// desc:        Update a ticket
// method:      PUT
// route:       '/api/tickets/:id'
const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Goal.findById(req.params.id);

  if (!ticket) {
    res.status(400);
    throw new Error(`There is no ticket with the id of ${req.params.id} `);
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedTicket);
});

// desc:        Update a ticket
// method:      DELETE
// route:       '/api/tickets/:id'
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
    throw new Error(`There is no ticket with the id of ${req.params.id} `);
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await ticket.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
