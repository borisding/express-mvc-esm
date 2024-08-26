import { Router } from 'express';
import * as homeController from '#controllers/homeController';

export const homeRouter = Router();

homeRouter.get('/', homeController.index);
