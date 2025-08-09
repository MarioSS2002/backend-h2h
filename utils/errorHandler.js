// utils/errorHandler.js

/**
 * Clase personalizada para errores de la aplicación
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Manejador global de errores para Express
 */
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // En desarrollo, mostrar información detallada del error
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    // En producción, enviar mensajes de error más genéricos
    sendErrorProd(err, res);
  }
};

/**
 * Enviar error en desarrollo
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * Enviar error en producción
 */
const sendErrorProd = (err, res) => {
  // Errores operacionales conocidos: enviar mensaje al cliente
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Errores de programación: no enviar detalles al cliente
    console.error("ERROR ❌", err);
    res.status(500).json({
      status: "error",
      message: "Algo salió mal!",
    });
  }
};

/**
 * Manejador de errores específicos de Express
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

module.exports = {
  AppError,
  globalErrorHandler,
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleValidationErrorDB,
  handleJWTError,
  handleJWTExpiredError,
};
