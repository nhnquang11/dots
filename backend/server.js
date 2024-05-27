const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const userRouter = require("./routes/user.route");
const topicRouter = require("./routes/topic.route");
const commentRouter = require("./routes/comment.route");
const storyRouter = require("./routes/story.route");
const loginRouter = require("./routes/login.route");
const uploadRouter = require("./routes/upload.route");
const analyticRouter = require("./routes/analytic.route");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function broadcastMessage(message) {
  const parsedMessage = JSON.parse(message.toString());
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(JSON.stringify(parsedMessage));
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  });
}

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log("Received:", JSON.parse(message.toString()));
    broadcastMessage(message);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);
app.use(middleware.trafficUpdator);

app.use("/api/users", userRouter);
app.use("/api/topics", topicRouter);
app.use("/api/comments", commentRouter);
app.use("/api/stories", storyRouter);
app.use("/api/login", loginRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/analytic", analyticRouter);

// Serve static files from the 'dist' directory
app.use(express.static("dist"));

// Handle all other routes by serving the static files
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = { server, broadcastMessage };
