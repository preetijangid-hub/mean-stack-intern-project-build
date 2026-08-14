const express = require("express");

const validateUser = require("../validators/userValidator");
const { createUser } = require("../controllers/userController");

const router = express.Router();

router.post("/", validateUser, createUser);

module.exports = router;