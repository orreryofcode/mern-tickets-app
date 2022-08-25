const mongoose = require("mongoose");

const ticketsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please provide a title for your ticket."],
    },
    description: {
      type: String,
      required: [true, "Please provide a description for your ticket."],
    },
    status: {
      type: String,
    },
    solved: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketsSchema);

module.exports = Ticket;
