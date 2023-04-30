import db from '../../src/models/index';

import express from 'express';
import path from 'path';

const app = express();

app.set('views', path.join(__dirname, '../views'));

class ExerciseController {
  static async getAll(req, res) {
    try {
      const allExercises = await db.Exercises.findAll();
      res.render(`${path.join(__dirname, '../views/exercises')}`, {
        exercises: allExercises,
        title: 'Exercise',
      });
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async addExercise(req, res) {
    try {
      const exercise = await db.Exercises.create({
        user_id: req.session.user_id,
        date: new Date(),
        name: req.body.name,
        interval: req.body.interval,
      });
      await exercise.save();
      res.redirect('/exercise');
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async getUpdateExercise(req, res) {
    try {
      const {id} = req.params;
      const exercise = await db.Exercises.findByPk(id);
      res.render(`${path.join(__dirname, '../views/update-exercise.ejs')}`, {
        exercise,
        title: 'Update Exercise',
      });
    } catch (err) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async updateExercise(req, res) {
    const {id} = req.params;
    try {
      const exercise = await db.Exercises.findByPk(id);
      if (!exercise) {
        return res.status(404).send('Exercise not found');
      }
      exercise.name = req.body.name;
      exercise.interval = req.body.interval;
      await exercise.save();
      res.redirect('/exercise');
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async deleteExercise(req, res) {
    const {id} = req.params;
    try {
      const exercise = await db.Exercises.findByPk(id);
      if (!exercise) {
        return res.status(404).send('Exercise not found');
      }
      await exercise.destroy();
      res.redirect('/exercise');
    } catch (error) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }
}

export default ExerciseController;
