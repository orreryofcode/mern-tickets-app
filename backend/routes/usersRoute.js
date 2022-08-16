const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getMe,
} = require("../controller/usersController");
const { protect } = require("../middleware/authenticate");

router.post("/", createUser);
router.post("/login", loginUser);
router.post("/me", protect, getMe);

module.exports = router;
