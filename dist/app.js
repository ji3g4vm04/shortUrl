import express from "express";
import { engine } from "express-handlebars";
import bodyParser from 'body-parser';
import routes from './Routes/index.js';
const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static('public'));
app.use(routes);
export default app;
//# sourceMappingURL=app.js.map