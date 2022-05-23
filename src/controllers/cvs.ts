import { ProfileDB } from "../models/Mongoose";
import { Router, RequestHandler } from "../vendor";

export let CvsRouter = Router();

export const createCvFormView: RequestHandler = (req, res, next) => {
  /*
  // TODO: Auth
  // if user is not auth, unauthorized 
   */

  let { paths } = ProfileDB.model.schema;

  let cleanPaths = Object.keys(paths).filter((p) => p !== "_id" && p !== "__v");

  res.send(cleanPaths);
};
