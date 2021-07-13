import { Router } from 'express';

const home = Router();

const homeProps = {
  title: 'Home',
  page: 'home'
};

// GET method for index action
export function index(req, res, next) {
  try {
    res.render('pages/home', homeProps);
  } catch (error) {
    next(error);
  }
}

home.get('/', index);

export default home;
