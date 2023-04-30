import express from 'express';
import routes from '../app/Routes/index';
import ejs from 'ejs';
import path from 'path';
import session from 'express-session';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 2 * 24 * 60 * 60 * 1000},
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejs.renderFile);

app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
