import { express, Router, initSvConfig, templateConfig } from "./vendor";
import {
  ProfileRouter as profR,
  createProfile,
  getProfileByEmail,
} from "./controllers/profiles";
import { CvsRouter as cvsR, createCvFormView } from "./controllers/cvs";

const app = express();
const enviroment = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 5000;
const mongoUri =
  (enviroment !== "development" && process.env.MONGO_URI) ||
  "mongodb://localhost:27017/newdb";

initSvConfig(app, PORT, mongoUri);
templateConfig(app, __dirname);

const apiRtr = Router()

// fixed by now
app.get("/profile", getProfileByEmail);

app.use('/cv', cvsR)
app.use('/api', apiRtr)

// CV
cvsR.get('/', createCvFormView)

// API
apiRtr.use("/profile", profR);
profR.post("/", createProfile);

