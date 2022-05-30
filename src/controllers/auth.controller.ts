import { Router } from "express";
import passport from 'passport'

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
  req.logout();
  req.session.destroy((error) => {
    if (error) {
      next({ message: error })
      return
    }
  })
  res.redirect('/')
})


authRouter.post('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy((error) => {
    if (error) {
      next({ message: error })
      return
    }
  })
  res.redirect('/')
})
