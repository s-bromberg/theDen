export default (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    const error = new Error('Login required');
    error.statusCode = 401;
    return next(error);
  }

  next();
};
