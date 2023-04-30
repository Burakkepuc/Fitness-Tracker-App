import jwt from 'jsonwebtoken';
import express from 'express';
import path from 'path';

const app = express();

app.set('views', path.join(__dirname, '../views'));

function verifyToken(req, res, next) {
  const token = req.session.token;
  console.log(token);
  if (!token) {
    return res.render(`${path.join(__dirname, '../views/404')}`, {
      title: '404',
    });
  }

  try {
    const decoded = jwt.verify(token, 'SimdilikBoyle');
    req.session.user_id = decoded.id;
    next();
  } catch (error) {
    res.redirect('/auth/lo gin');
  }
}

module.exports = verifyToken;
