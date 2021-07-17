const homeProps = {
  title: 'Home',
  $asset: 'home'
};

// GET method for index action
export function index(req, res, next) {
  try {
    res.render('pages/home', homeProps);
  } catch (error) {
    next(error);
  }
}
