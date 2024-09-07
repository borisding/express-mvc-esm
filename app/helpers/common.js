export const catchNext = callback => {
  return (req, res, next) => {
    try {
      callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
