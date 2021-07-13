import { Router } from 'express';
import * as homeController from '../controllers/homeController.js';

const home = Router();
home.get('/', homeController.index);

export default home;
