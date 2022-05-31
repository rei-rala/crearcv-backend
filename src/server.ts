import express, { Router } from 'express';
import dotenv from 'dotenv';

import passport from 'passport'

import configServer from "./libs";

import { isLoggedIn } from './middlewares/auth'
import { apiErrorMiddleware, templateErrorMiddleware } from "./middlewares/errors";
import { authRouter } from './controllers/auth.controller';
import * as baseRoutes from './controllers/base.controller';
import * as myCvsRoutes from './controllers/myCvs.controller';

let { myCvs } = myCvsRoutes

dotenv.config()
const app = express();
const port = process.env.PORT || '5000'
const mongoUrl = process.env.NODE_ENV !== "development" && process.env.MONGO_URI || "mongodb://127.0.0.1:27017/newdb";

configServer(app, port, __dirname, mongoUrl)

app.use('/auth', authRouter)
app.get('/login/cb', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/auth/login/failure'
}))


app.use('/myCvs', myCvs)
myCvs.get('/', myCvsRoutes.createCv)

myCvs.use(isLoggedIn)
myCvs.post('/create', myCvsRoutes.createNewCv)
myCvs.get('/edit/:id', myCvsRoutes.editCvPage)
myCvs.post('/edit/:id', myCvsRoutes.editCvAction)

app.get('/', baseRoutes.landingPage)
app.get('/profile', isLoggedIn, baseRoutes.getProfile)

app.get('/login/cb', (req, res) => {
  res.redirect('/')
})

app.get('/auth/login/cb', (req, res) => {
  res.redirect('/')
})

app.use(templateErrorMiddleware)


// API ROUTES
const API_ROUTER = express.Router();
app.use('/api', API_ROUTER)
API_ROUTER.use(apiErrorMiddleware)