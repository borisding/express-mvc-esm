import { Router } from 'express';
import * as homeController from '../controllers/homeController.js';

export const homeRouter = Router();

homeRouter.get('/', homeController.index);
