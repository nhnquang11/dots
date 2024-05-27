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

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const app = express();
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

app.use(express.static("dist"));

// Handle all other routes by serving the static files
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
