import express from 'express';
import fs from 'fs';
import verifyToken from '../Helpers/verifyToken';
import path from 'path';

const app = express();
const routeNameArray = [];

fs.readdir('./app/Routes', (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      //  Do not read the index !!
      if (file.indexOf('index.js') !== -1 && file.indexOf('auth.js')) return;
      const routeName = file.slice(0, -3).toLowerCase();
      routeNameArray.push(routeName);
      if (routeName === 'index') return;
      const route = require(`../Routes/${routeName}`);
      if (routeName === 'auth') app.use(`/${routeName}`, route);
      else app.use(`/${routeName}`, verifyToken, route);
    });
  }
});

app.get('/', (req, res) => {
  const token = req.session.token;
  if (token) {
    return res.render('dashboard', {title: 'Dashboard'});
  } else {
    return res.redirect('/auth/login');
  }
});

app.use((req, res, next) => {
  const url = req.url;
  const routeName = url.split('/')[1];
  if (!routeNameArray.includes(routeName)) {
    return res.render(`${path.join(__dirname, '../views/404.ejs')}`, {
      title: '404',
    });
  }
  next();
});

module.exports = app;
