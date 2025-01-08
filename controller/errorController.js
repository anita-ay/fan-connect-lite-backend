const httpStatus = require('http-status');
const AppError = require('../utils/appError');

const handleCastErrorFromDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, httpStatus.BAD_REQUEST);
};
const handleDuplicateFieldFromDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  console.log(value);
  const message = `Duplicate field value ${value[0]}. Please use another value`;

  return new AppError(message, httpStatus.BAD_REQUEST);
};
const handleValidationErrorFromDB = (err) => {
  const errors = Object.values(err.errors)
    .map((el) => el.message)
    .join('. ');

  const message = `Invalid input data ${errors}`;

  return new AppError(message, httpStatus.BAD_REQUEST);
};

const handleJwtError = () => {
  return new AppError(
    'There is an error with the token',
    httpStatus.UNAUTHORIZED,
  );
};

const handleJWTExpiredError = () =>
  new AppError(
    'Your token has expired!!! please login again',
    httpStatus.UNAUTHORIZED,
  );
const sendDevErr = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendProdErr = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log({ err });
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

exports.globalErrorHandler = (err, req, res, next) => {
  err.status = err.status || 500;
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    if (err.name === 'CastError') {
      err = handleCastErrorFromDB(err);
    }

    if (err.code === 11000) {
      err = handleDuplicateFieldFromDB(err);
    }
    if (err.name === 'ValidationError') {
      err = handleValidationErrorFromDB(err);
    }
    if (err.name === 'JsonWebTokenError') {
      err = handleJwtError();
    }
    if (err.name === 'TokenExpiredError') {
      err = handleJWTExpiredError(err);
    }
    sendDevErr(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') {
      error = handleCastErrorFromDB(error);
    }
    if (err.code === 11000) {
      err = handleDuplicateFieldFromDB(err);
    }
    if (err.name === 'ValidationError') {
      err = handleValidationErrorFromDB(err);
    }
    if (err.name === 'JsonWebTokenError') {
      err = handleJwtError();
    }
    if (err.name === 'TokenExpiredError') {
      err = handleJWTExpiredError(err);
    }
    sendProdErr(err, res);
  }
};