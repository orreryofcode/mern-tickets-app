const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getMe,
  forgotPass,
  forgotPassVerify,
} = require("../controller/usersController");
const { protect } = require("../middleware/authenticate");

router.post("/", createUser);
router.post("/login", loginUser);
router.post("/me", protect, getMe);
router.post("/forgot-password", forgotPass);
router.put("/forgot-password/:token", forgotPassVerify);

module.exports = router;
