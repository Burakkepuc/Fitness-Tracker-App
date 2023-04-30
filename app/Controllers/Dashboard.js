import express from 'express';
import path from 'path';

const app = express();

app.set('views', path.join(__dirname, '../views'));

class DashboardController {
  static async getAll(req, res) {
    try {
      res.render(`${path.join(__dirname, '../views/dashboard')}`, {
        title: 'Dashboard',
      });
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }
}

export default DashboardController;
