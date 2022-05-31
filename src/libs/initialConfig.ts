import cookieParser from 'cookie-parser'
import { Express, json, urlencoded, static as staticFolder } from 'express';
import { closeConnectionToDB, connectToDB } from '../models/Mongoose';
import morgan from 'morgan'
import moment from 'moment';

export const initSvConfig = (expressApp: Express, mongoUrl: string, port: string) => {
  moment.locale('es')

  let enviroment = process.env.NODE_ENV || "development";

  if (enviroment.includes('dev')) {
    expressApp.use(morgan('dev'))
  }

  expressApp.use(cookieParser())
  expressApp.use(json());
  expressApp.use(urlencoded({ extended: true }));
  expressApp.use(staticFolder('public'));

  expressApp.listen(port, () => {
    console.info(`Server is running on port ${port}`);
    connectToDB(mongoUrl)
      .then(() => console.info('Connected to MongoDB'))
      .catch(err => {
        console.error('Error connecting to MongoDB: ', err)
        closeConnectionToDB()
      });
  })

  process.on('error', (err)=>{
    console.error(err)
    closeConnectionToDB()
  })
}