import { express, Router, initSvConfig, templateConfig } from "./vendor";
import { apiErrorMiddleware } from "./middlewares/errors";

const app = express();
const enviroment = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 5000;
const mongoUri = (enviroment !== "development" && process.env.MONGO_URI) || "mongodb://localhost:27017/newdb";

initSvConfig(app, PORT, mongoUri, enviroment);
templateConfig(app, __dirname);

const API_ROUTER = Router();
app.use('/api', API_ROUTER)
API_ROUTER.use(apiErrorMiddleware)