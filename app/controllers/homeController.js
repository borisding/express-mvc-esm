import { catchNext } from '#helpers/common';

const homeProps = {
  title: 'Home',
  $asset: 'home'
};

// GET method for index action
export const index = catchNext((req, res) => {
  req.session.view = (req.session.view ?? 0) + 1;
  res.render('pages/home', {
    ...homeProps,
    viewCount: req.session.view
  });
});
