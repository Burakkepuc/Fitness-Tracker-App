import db from '../../src/models/index';

import express from 'express';
import path from 'path';
import bcrypt from 'bcrypt';
import ValidateAuth from '../Validations/Auth';

const app = express();
const saltRounds = 10;

app.set('views', path.join(__dirname, '../views'));

class AuthController{

  static async register(req, res){
    try {
       try {
      res.render(`${path.join(__dirname, '../views/register')}`, {
        title: 'Register',
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
} catch (error) {
  return res.status(500).json({ error: error.message });
}
}

  static async createUser(req, res){
    try {
      const {name,surname, email, password } = req.body;
      const findUser = await db.Users.findOne({ where: { email: req.body.email } });
      if (findUser) {
      return res.render(`${path.join(__dirname, '../views/register')}`, {
      title: 'Register',
      error: 'User already exists'
    });
      }

        const hashPassword = await bcrypt.hash(password, saltRounds);
        const validateCreateUser = await ValidateAuth.validateRegister(req.body);
        console.log(validateCreateUser);
        if (!validateCreateUser.type) {
          return res.render(`${path.join(__dirname, '../views/register')}`, {
          title: 'Register',
          error: validateCreateUser.message
        });
        }

      const newUser = await db.Users.create({
        name,
        surname,
        email,
        password: hashPassword,
      });
      return res.status(201).json(newUser);
    } catch (error) {
  return res.status(500).json({ error: error.message });
      
    }
  }

}

 export default AuthController