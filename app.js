const express = require("express");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

// console.log(process.env.NODE, 'ENV');

// const authRouter = require("./routes/auth");
const userRouter = require("./routes/userRouter");

const USER_URL = "/api/v1/users";

const app = express();


app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// READING DATA

// app.use('/api/auth', authRouter);
app.use(USER_URL, userRouter);
app.use(globalErrorHandler.globalErrorHandler);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl}`);

  next(new AppError(err.message, httpStatus.NOT_FOUND));
});

// GLOBAL ERROR HANDLER
// app.use(globalErrorHandler);

module.exports = app;
