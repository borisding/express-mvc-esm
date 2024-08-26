// sending page not found response when none of routes was matched
// @see: https://expressjs.com/en/4x/api.html#res.format
// eslint-disable-next-line no-unused-vars
export const notFound = () => (req, res, next) => {
  const message = 'Page Not Found.';
  const code = 404;

  res.status(code);
  res.format({
    text() {
      res.send(message);
    },
    html() {
      res.render('pages/404', {
        title: 'Not Found',
        code,
        message
      });
    },
    json() {
      res.send({
        errors: [
          {
            name: 'NotFound',
            code,
            message
          }
        ]
      });
    }
  });
};
