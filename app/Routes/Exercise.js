import express from 'express';
import Exercise from '../Controllers/Exercise';
const router = express.Router();

router.get('/', Exercise.getAll);
router.post('/add-exercise', Exercise.addExercise);
router.get('/update-exercise/:id', Exercise.getUpdateExercise);
router.post('/update-exercise/:id', Exercise.updateExercise);
router.get('/delete-exercise/:id', Exercise.deleteExercise);

module.exports = router;
