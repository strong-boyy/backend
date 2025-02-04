const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const ApiError = require("./src/api-error");
const { connectDB } = require("./src/config/database");
const config = require("./src/config/index");
const port = config.app.port;
const passport = require("./src/passport");
const userRouter = require("./src/routes/user.route");
const taskRouter = require("./src/routes/task.route");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: config.app.jwt.key, 
    resave: false, 
    saveUninitialized: false,
    cookie: {
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("<a href='/api/users/auth/google'>Login with google</a>");
});

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startServer();
