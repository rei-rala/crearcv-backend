import { RequestHandler } from "express"

export const isLoggedIn: RequestHandler = (req, _, next) => {
  req.user
    ? next()
    : next({ code: 401, message: 'Please log in using your Google account' })
}
