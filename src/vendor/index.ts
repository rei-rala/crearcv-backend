import path from 'path'
import dotenv from 'dotenv';
import express, { Express, Router, RequestHandler } from 'express';

import { engine, create } from 'express-handlebars';
import { closeConnectionToDB, connectToDB } from '../models/Mongoose';
import morgan from 'morgan'

const initSvConfig = (expressApp: Express, port: string | number, mongoDbUri: string, enviroment: string = 'dev') => {
  dotenv.config()

  if (enviroment.includes('dev')) {
    expressApp.use(morgan('dev'))
  }

  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.static('public'));


  expressApp.listen(port, () => {
    console.info(`Server is running on port ${port}`);
    connectToDB(mongoDbUri)
      .then(() => console.info('Connected to MongoDB'))
      .catch(err => {
        console.error('Error connecting to MongoDB: ', err)
        closeConnectionToDB()
      });
  })
}



const templateConfig = (expressApp: Express, dirName: string) => {
  let hbs: any = create({})
  hbs.handlebars.registerHelper('compareStrings', (p: any, q: any, options: any) => {
    return (p == q) ? options.fn(this) : options.inverse(this);
  });
  hbs.handlebars.registerHelper('lower', (p: any) => {
    return p.toLowerCase()
  })
  hbs.handlebars.registerHelper('upper', (p: any) => {
    return p.toUpperCase()
  })

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