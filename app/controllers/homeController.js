const homeProps = {
  title: 'Home',
  $asset: 'home'
};

// GET method for index action
export function index(req, res, next) {
  try {
    req.session.view = (req.session.view ?? 0) + 1;
    res.render('pages/home', {
      ...homeProps,
      viewCount: req.session.view
    });
  } catch (error) {
    next(error);
  }
}
