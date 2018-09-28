require('dotenv').config();
import { express } from 'express';
import { bodyParser } from 'body-parser';
import { route } from './routes.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.listen(PORT, () => {
  console.log('app running on port.');
  console.log("testing heroku"),
  console.log(PORT)
});


export { app };
