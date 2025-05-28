const express = require("express");
const { signIn, signUp, getUsers } = require("../controller/auth.controller");
const { authenticateToken } = require("./middlewares/jwt-token.middleware");
const router = express.Router();

router.post("/signin", authenticateToken, signIn);
router.post("/signup", signUp);
router.post("/users", authenticateToken, getUsers);

module.exports = router;