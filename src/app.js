import express from 'express';
import bodyParser from 'body-parser';
import route from './routes';

require('dotenv').config();

//const PORT = 'process.env.PORT, process.env.IP' || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log('it has started');
  //console.log(process.env.devConnectionString);
});


export default app;
