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
      return res.status(500).send(error.message);
    }
  }

  static async addNutrition(req, res) {
    try {
      const nutrition = await db.Nutritions.create(req.body);
      await nutrition.save();
      res.redirect('/nutrition');
    } catch (error) {
      return res.status(500).json({error: error.message});
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
      res.status(500).send(err.message);
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
    } catch (error) {}
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
      return res.status(500).send(error.message);
    }
  }
}

export default NutritionController;
