import { Express } from 'express'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import { UserDB } from '../models/Mongoose'

export const passportConfig = async (expressApp: Express, mongoUrl: string) => {

  let clientID = process.env.GOOGLE_CLIENT_ID || ''
  let clientSecret = process.env.GOOGLE_CLIENT_SECRET || ''
  let callbackURL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/auth/login/cb'

  passport.use(new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL,
    passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, done) => {

    let today = new Date().valueOf()
    const { id, displayName, emails, photos } = profile
    let [{ value: photo }] = photos ?? [{ value: '' }]
    let [{ value: email }] = emails ?? [{ value: '' }]

    let find = await UserDB.find({ id })

    if (!find.found) {
      const save = await UserDB.save({
        id,
        registered: today,
        lastConnection: today,
      })

      if (save.error) {
        done('Error al salvar nuevo usuario \n' + save.error)
        return
      }
      if (save.saved) {
        let { id, registered, lastConnection } = save.saved
        let userCreated = { id, registered, lastConnection }
        done(null, { ...userCreated, displayName, email, photo })
        return
      }
      done('Error desconocido al salvar nuevo usuario')
      return
    }

    if (find.found) {
      let { id, registered, lastConnection } = find.found
      let userFound = { id, registered, lastConnection }
      done(null, { ...userFound, displayName, email, photo })
      return
    }

    if (find.error) {
      done('Error buscando usuario \n' + find.error)
    }

    done('Error desconocido en autenticacion')
  }))

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user: any, done) => {
    done(null, user)
  })


  expressApp.use(session({
    secret: process.env.SESSION_SECRET || 'secretin',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl,
      ttl: 30 * 24 * 60 * 60 // 30 days
    })
  }))

  expressApp.use(passport.initialize())
  expressApp.use(passport.session())
}