import express from 'express'
import dotenv from 'dotenv';
import chalk from 'chalk'
import * as eta from 'eta';

import { isDev, paths } from './utils.js';
const app = express()

// load node environment variables
dotenv.config();

// app view engine and directories config
eta.configure({ cache: !isDev });
app.engine('eta', eta.renderFile);
app.set('view engine', 'eta');
app.set('views', [paths.views]);
  
// running express app server
const PORT = parseInt(process.env.PORT, 10) ?? 5000;
app.listen(PORT, () => {
    console.log(chalk.cyan('App server is up, listening PORT:'), PORT)
})
.on('error', err => {
    console.error(chalk.red(err.message));
    process.exit(-1);
  });