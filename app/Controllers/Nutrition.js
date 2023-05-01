import db from '../../src/models/index';

import express from 'express';
import path from 'path';

const app = express();

app.set('views', path.join(__dirname, '../views'));

class NutritionController {
  static async getAll(req, res) {
    try {
      const allNutrition = await db.Nutritions.findAll();
      res.render(`${path.join(__dirname, '../views/nutritions')}`, {
        nutritions: allNutrition,
        title: 'Nutrition',
      });
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async addNutrition(req, res) {
    try {
      await db.Nutritions.create({
        user_id: req.session.user_id,
        date: new Date(),
        name: req.body.name,
        calories: req.body.calories,
      });
      res.redirect('/nutrition');
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404.ejs')}`, {
        title: '404',
      });
    }
  }

  static async getUpdateNutrition(req, res) {
    try {
      const {id} = req.params;
      const nutrition = await db.Nutritions.findByPk(id);
      res.render(`${path.join(__dirname, '../views/update-nutrition.ejs')}`, {
        nutrition,
        title: 'Update Nutrition',
      });
    } catch (err) {
      return res.render(`${path.join(__dirname, '../views/404.ejs')}`, {
        title: '404',
      });
    }
  }

  static async updateNutrition(req, res) {
    try {
      const {id} = req.params;

      const nutrition = await db.Nutritions.findByPk(id);
      if (!nutrition) {
        return res.status(404).send('Nutrition not found');
      }
      nutrition.name = req.body.name;
      nutrition.calories = req.body.calories;
      await nutrition.save();
      res.redirect('/nutrition');
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404.ejs')}`, {
        title: '404',
      });
    }
  }

  static async deleteNutrition(req, res) {
    try {
      const {id} = req.params;
      const nutrition = await db.Nutritions.findByPk(id);
      if (!nutrition) {
        return res.status(404).send('Nutrition not found');
      }
      await nutrition.destroy();
      res.redirect('/nutrition');
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }
}

export default NutritionController;
