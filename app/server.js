import express from 'express'
import dotenv from 'dotenv';
import chalk from 'chalk'

dotenv.config();

const app = express()

// running express app server
const PORT = parseInt(process.env.PORT, 10) ?? 5000;
app.listen(PORT, () => {
    console.log(chalk.cyan('App server is up, listening PORT:'), PORT)
})
.on('error', err => {
    console.error(chalk.red(err.message));
    process.exit(-1);
  });