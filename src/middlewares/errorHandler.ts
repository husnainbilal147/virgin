const errorHandler = async (error, req, res, next) => {

  // Log to DB
  return next();
};

export default errorHandler;
