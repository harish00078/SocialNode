exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  const isCast = err && err.name === 'CastError';
  const isValidation = err && err.name === 'ValidationError';
  const status = isCast ? 400 : isValidation ? 400 : (err.status || 500);
  const message = isCast
    ? 'Invalid resource identifier'
    : isValidation
      ? 'Validation failed'
      : (err.message || 'Server error');
  res.status(status).json({ message });
};
