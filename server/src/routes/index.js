const express = require("express");
const authRoutes = require("./auth.route.js");
const boardRoutes = require("./board.route.js");
const userRoutes = require("./user.route.js");
const router = express.Router();


router.get("/health", (_req, res) =>
  res.json({ status: "ok" })
);
router.use("/auth", authRoutes);
router.use("/boards", boardRoutes);
router.use("/users", userRoutes);

module.exports = router;