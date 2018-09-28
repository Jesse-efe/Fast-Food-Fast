import { express } from 'express';
import { bodyParser } from 'body-parser';
import { route } from './routes.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.listen(3000, () => {
  console.log('app running on port.');
});


export { app };
