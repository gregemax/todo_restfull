export const handle = (error, req, res, next) => {
  error.message = error.message || "wronge route";
  error.status = error.status || 400;
  if (process.env.NODE_ENV === "development") {
    res.status(error.status).json({
      error: error.message,
      status: error.status,
      stackTrace: error.stack,
      
    });
  }
  if (process.env.NODE_ENV === "production") {
    res.status(error.status).json({
      error: error.message,
      status: error.status,
    });
  }
};
