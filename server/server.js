require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");

const apiRoutes = require("./src/routes/index.js");
const {
  errorHandler,
  notFoundHandler,
} = require("./src/middleware/errorHandler");

const {initSocket} = require("./src/sockets/index.js");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || process.env.CLIENT_DEV_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) =>
  res.json({
    name: "TASKFORGE API",
    status: "running",
  })
);

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const httpServer = http.createServer(app);
initSocket(httpServer);
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`🚀 TASKFORGE API + Socket.IO server running on http://localhost:${PORT}`);
});

module.exports = app;