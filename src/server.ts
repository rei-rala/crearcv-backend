import { express, initSvConfig, templateConfig } from './vendor';
import { ProfileRouter as profR, getProfileByEmail } from './controllers/profiles';

const app = express();
const enviroment = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const mongoUri = (enviroment !== 'development' && process.env.MONGO_URI) || "mongodb://localhost:27017/newdb";

initSvConfig(app, PORT, mongoUri);
templateConfig(app, __dirname);

app.get('/', (_, res) => {
  res.render('home', {
    title: 'Home',
  })
})

app.use('/profile', profR)
profR.get('/', getProfileByEmail)