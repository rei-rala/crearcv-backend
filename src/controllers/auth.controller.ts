import { Router } from "express";
import passport from 'passport'

// extending Request type for session logout function arguments
declare module 'express-serve-static-core' {
  export interface Request {
    logout: (...args) => void
    logOut: (...args) => void
    session: {
      destroy: (...args) => void
    }
  }
}

export const authRouter = Router()

authRouter.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }))
authRouter.get('/login/cb', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/auth/login/failure'
}))

authRouter.get('/login/failure', (_, res) => {
  res.json({ msg: "Has cerrado sesion" })
})
authRouter.get('/login/success', (_, res) => {
  res.json({ msg: "Has iniciado sesion correctamente" })
})


authRouter.get('/logout', (req, res, next) => {
  // TODO: FIX LOGOUT ERROR
  // Message: req#logout requires a callback function
  req.logout()
  req.logOut()

  req.session.destroy()
  res.redirect('/')
})
