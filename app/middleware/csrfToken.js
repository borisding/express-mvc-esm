// make `_csrfToken` accessible in view templates, conveniently
const csrfToken = generateToken => (req, res, next) => {
  res.locals._csrfToken = generateToken(req, res);
  next();
};

export default csrfToken;
