import express from 'express';
import Contact from '../Controllers/Contact';
const router = express.Router();

router.get('/', Contact.getAll);

module.exports = router;
