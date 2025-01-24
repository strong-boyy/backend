const express = require("express");
const cors = require("cors");

const app = express();
const ApiError = require("./src/api-error");
const config = require("./src/configs/index");
const port = config.app.port;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to strong-boyy" });
});

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


