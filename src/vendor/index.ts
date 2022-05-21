import path from 'path'
import dotenv from 'dotenv';
import express, { Express, Router, RequestHandler } from 'express';
import { engine } from 'express-handlebars';
import { closeConnectionToDB, connectToDB } from '../models/Mongoose';

const initSvConfig = (expressApp: Express, port: string | number, mongoDbUri: string) => {
  dotenv.config()
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.static('public'));


  expressApp.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectToDB(mongoDbUri)
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => {
        console.log('Error connecting to MongoDB: ', err)
        closeConnectionToDB()
      });
  })
}

const templateConfig = (expressApp: Express, dirName: string) => {
  expressApp.set('view engine', 'pug');
  expressApp.set('views', 'views');

  expressApp.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'base.hbs',
    layoutsDir: path.join(dirName, './views/layout'),
    partialsDir: path.join(dirName, './views/partials')
  }));

  expressApp.set('views', path.join(dirName, '/views'));
  expressApp.set('view engine', '.hbs');
}

export {
  path, dotenv, engine, express,
  Router, RequestHandler,
  initSvConfig, templateConfig
}