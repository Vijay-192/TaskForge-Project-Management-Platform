const express = require("express");
const authRoutes = require("./auth.route.js");

const router = express.Router();


router.get("/health", (_req, res) =>
  res.json({ status: "ok" })
);
router.use("/auth", authRoutes);

module.exports = router;