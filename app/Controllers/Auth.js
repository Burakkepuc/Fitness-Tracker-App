import db from '../../src/models/index';

import express from 'express';
import path from 'path';
import bcrypt from 'bcrypt';
import ValidateAuth from '../Validations/Auth';
import session from 'express-session';
import jwt from 'jsonwebtoken';

const app = express();
const saltRounds = 10;

app.set('views', path.join(__dirname, '../views'));

class AuthController {
  static async register(req, res) {
    try {
      try {
        res.render(`${path.join(__dirname, '../views/register')}`, {
          title: 'Register',
          error: '',
        });
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async createUser(req, res) {
    try {
      const {name, surname, email, password} = req.body;

      const validateCreateUser = await ValidateAuth.validateRegister(req.body);
      if (!validateCreateUser.type) {
        return res.render(`${path.join(__dirname, '../views/register')}`, {
          title: 'Register',
          error: validateCreateUser.message,
        });
      }

      const findUser = await db.Users.findOne({where: {email: req.body.email}});

      if (findUser) {
        return res.render(`${path.join(__dirname, '../views/register')}`, {
          title: 'Register',
          error: 'User already exists',
        });
      }

      const hashPassword = await bcrypt.hash(password, saltRounds);

      await db.Users.create({
        name,
        surname,
        email,
        password: hashPassword,
      });
      return res.redirect('/auth/login');
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async login(req, res) {
    try {
      res.render(`${path.join(__dirname, '../views/login')}`, {
        title: 'Login',
      });
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const {email, password} = req.body;

      const validateLoginUser = await ValidateAuth.validateLogin(req.body);
      if (!validateLoginUser.type) {
        return res.render(`${path.join(__dirname, '../views/login')}`, {
          title: 'Login',
          error: validateLoginUser.message,
        });
      }

      const findUser = await db.Users.findOne({
        where: {email},
      });

      if (!findUser) {
        return res.render(`${path.join(__dirname, '../views/login')}`, {
          title: 'Login',
          error: 'User does not exist',
        });
      }

      const validPassword = await bcrypt.compare(password, findUser.password);

      if (!validPassword) {
        return res.render(`${path.join(__dirname, '../views/login')}`, {
          title: 'Login',
          error: 'Invalid password',
        });
      }

      const token = jwt.sign({id: findUser.id}, 'SimdilikBoyle', {
        expiresIn: '2d',
      });

      req.session.token = token;
      return res.redirect('/dashboard');
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy();
      return res.render(`${path.join(__dirname, '../views/login')}`, {
        title: 'Login',
        error: '',
      });
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }
}

export default AuthController;
