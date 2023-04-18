import express from 'express';
import Nutrition from '../Controllers/Nutrition';
const router = express.Router();

router.get('/', Nutrition.getAll);
router.post('/add-nutrition', Nutrition.addNutrition);
router.get('/update-nutrition/:id', Nutrition.getUpdateNutrition);
router.post('/update-nutrition/:id', Nutrition.updateNutrition);
router.get('/delete-nutrition/:id', Nutrition.deleteNutrition);

module.exports = router;
