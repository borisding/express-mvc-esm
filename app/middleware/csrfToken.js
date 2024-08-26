// make `_csrfToken` accessible in view templates, conveniently
export const csrfToken = generateToken => (req, res, next) => {
  res.locals._csrfToken = generateToken(req, res);
  next();
};
