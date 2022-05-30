import { Router } from 'express';
import type { RequestHandler } from "express";
import { CvDB, UserDB } from '../models/Mongoose';
import { profileExample } from '../temp';

import moment from 'moment'

type User = {
  id: string,
  displayName: string,
  emails: [{ value: string, verified: boolean }],
  photos: [{ value: string }],
  email: string,
  photo: string,
  registered: number,
  lastConnection: number,
}

export const baseRouter = Router();
// extending Request type for user integration
declare module 'express-serve-static-core' {
  export interface Request {
    user: User | null
  }
}
export const landingPage: RequestHandler = async (req, res, next) => {
  await UserDB.save(profileExample)

  res.render('home', {
    htmlTitle: undefined,
    title: 'Hello landing page!',
    user: req.user
  });
}

export const getCv: RequestHandler = async (req, res, next) => {
  let { displayName, registered, lastConnection } = req.user!

  let reg = moment(new Date(registered))
  let lastConn = moment().from(lastConnection)

  res.render('profileLogged', {
    htmlTitle: displayName ? displayName : 'Mi perfil',
    title: `Perfil de ${req.user?.displayName || "usuario"}`,
    user: { ...req.user, registered: reg, lastConnection: lastConn }
  })
}

export const createCv: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    res.render('home', {
      htmlTitle: 'Crear CV',
      title: "Pagina de creacion de CV",
      user: req.user
    })
    return
  }
  let { id, displayName } = req.user
  let cvs = (await CvDB.findAll({ ownerId: id }) || []).map(objs => ({
    ...objs,
    id: objs._id.toString()
  }))

  res.render('createLogged', {
    htmlTitle: "Crear CV",
    title: cvs ? 'Editar' : `Crear` + ` CV para ${displayName}`,
    user: req.user,
    cvs
  })
}

export const createCvActive: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    return next({ code: 401, message: 'Debes iniciar session para acceder a esta funcion' })
  }

  let { newCv } = req.body
  let { id, displayName } = req.user

  if (newCv === 'on') {
    let { saved, error } = await CvDB.save({
      ownerId: id,
      created: new Date(),
      lastUpdated: new Date(),
      name: displayName
    })

    if (error || !saved) {
      return next({
        code: error ? 400 : 500,
        message: error ? error : 'SERVER ERROR'
      })
    }
    return res.redirect(`/create/${saved.id}`)
  }

  let { found, error } = await CvDB.find({ id })

  if (error || !found) {
    return next({ code: error ? 500 : 404, message: error || 'Not found' })
  }

  res.render('createForm', {
    htmlTitle: `CV de ${displayName}`,
    title: `Editando ${id}`,
    user: req.user
  })
}


export const editCvActive: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    return next({ code: 401, message: 'Debes iniciar session para acceder a esta funcion' })
  }

  let { id: _id } = req.params

  if (!_id) {
    return next({ code: 400, message: "Proporcione id de CV" })
  }

  let { id, displayName } = req.user
  let { found: cv, error } = await CvDB.find({ _id })

  if (error || !cv) {
    return next({
      code: error?.includes('Cast to ObjectId') ? 400 : error ? 500 : 404,
      message: !error || error?.includes('Cast to ObjectId') ? 'CV no encontrado' : error
    })
  }

  if (cv.ownerId !== id) {
    return next({
      code: 401,
      message: 'No estas autorizado a editar este CV'
    })
  }


  res.render('createForm', {
    htmlTitle: `CV de ${displayName}`,
    title: `Editando cv #${_id}`,
    user: req.user,
    cv
  })
}