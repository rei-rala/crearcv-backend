import express from 'express';
import dotenv from 'dotenv';

import passport from 'passport'

import configServer from "./libs";
import { createCv, createCvActive, editCvActive, getCv, landingPage, } from './controllers/base.controller';
import { isLoggedIn } from './middlewares/auth'
import { apiErrorMiddleware, templateErrorMiddleware } from "./middlewares/errors";
import { authRouter } from './controllers/auth.controller';


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
app.get("/logout", (req, res, next) => {
  req.session.destroy((error) => error ? next({ error }) : res.redirect("/"))
  req.user = null
});


app.get('/', landingPage)
app.get('/create', createCv)
app.post('/create', createCvActive)
app.get('/create/:id', editCvActive)

app.get('/protegido', isLoggedIn, (req, res) => { res.render('home', { user: req.user }) })
app.get('/profile', isLoggedIn, getCv)

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