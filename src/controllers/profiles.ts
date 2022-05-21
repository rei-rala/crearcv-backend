import { ProfileDB } from "../models/Mongoose";
import { Router, RequestHandler } from "../vendor";

export const ProfileRouter = Router();
//let title = 'Profiles';

export const getProfileByEmail: RequestHandler = async (req, res, next) => {
  const email = req.query.email;

  if (!email) {
    res.status(400).send({
      msg: 'bad request',
      error: 'Email is required',
    })
    return
  }

  const { found, error } = await ProfileDB.findOne({ email });

  if (!found || error) {
    res.send({
      ok: false,
      email,
      error: error ? error : `Profile with email ${email} was not found`,
    })
    return
  }


  res.send({
    ok: true,
    email,
    profile: found
  })
}
