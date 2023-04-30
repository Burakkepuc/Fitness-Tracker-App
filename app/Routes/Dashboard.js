import express from 'express';
import Dashboard from '../Controllers/Dashboard';
const router = express.Router();

router.get('/', Dashboard.getAll);

module.exports = router;
