import express from 'express';
import Auth from '../Controllers/Auth';
const router = express.Router();

router.get('/register', Auth.register);
router.post('/createUser', Auth.createUser);
// router.post('/login', Auth.login);
// router.get('/logout', Auth.logout);
module.exports = router;
