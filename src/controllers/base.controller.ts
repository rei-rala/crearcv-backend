import type { RequestHandler } from "express";
import moment from "moment";

export const landingPage: RequestHandler = async (req, res, next) => {

  res.render('home', {
    htmlTitle: undefined,
    title: 'Hello landing page!',
    user: req.user
  });
}


export const getProfile: RequestHandler = async (req, res, next) => {
  let { displayName, registered, lastConnection } = req.user!

  let reg = moment(new Date(registered))
  let lastConn = moment().from(lastConnection)

  res.render('profileLogged', {
    htmlTitle: displayName ? displayName : 'Mi perfil',
    title: `Perfil de ${req.user?.displayName || "usuario"}`,
    user: { ...req.user, registered: reg, lastConnection: lastConn }
  })
}