import db from '../../src/models/index';

import express from 'express';
import path from 'path';

const app = express();

app.set('views', path.join(__dirname, '../views'));

class ContactController {
  static async getAll(req, res) {
    try {
      res.render(`${path.join(__dirname, '../views/contact')}`, {
        title: 'Contact',
      });
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }
}

export default ContactController;
