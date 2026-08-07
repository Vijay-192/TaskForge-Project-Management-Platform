const express = require("express");

const { requireAuth } = require("../middleware/auth.js");
const { searchUsers } = require("../controllers/user.Controller.js");

const router = express.Router();

router.get("/search", requireAuth, searchUsers);

module.exports = router;