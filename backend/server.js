const express = require("express");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tickets", require("./routes/ticketsRoute"));
app.use("/api/users", require("./routes/usersRoute"));

// Serve frontend here

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server started");
});
