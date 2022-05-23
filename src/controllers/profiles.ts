import { ProfileDB } from "../models/Mongoose";
import { Router, RequestHandler } from "../vendor";

export const ProfileRouter = Router();

export const createProfile: RequestHandler = async (req, res, next) => {
  //let newProfile = await ProfileDB.save(profileExample);

  res.send('createProfile route');
};

export const getProfileByEmail: RequestHandler = async (req, res, next) => {
  let email = req.query.email;

  if (!email) {
    email = req.body.email;
  }

  if (!email) {
    res.status(400).send({
      ok: false,
      msg: "bad request",
      error: "Email is required",
    });
    return;
  }

  const { found, error } = await ProfileDB.findOne({ email });

  if (!found || error) {
    res.status(404).send({
      ok: false,
      email,
      error: error ? error : `Profile with email ${email} was not found`,
    });
    return;
  }

  res.status(200).send({
    ok: true,
    email,
    profile: found,
  });
};
