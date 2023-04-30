import express from 'express';
import Auth from '../Controllers/Auth';
const router = express.Router();

router.get('/register', Auth.register);
router.post('/createUser', Auth.createUser);
router.get('/login', Auth.login);
router.post('/loginUser', Auth.loginUser);
router.get('/logout', Auth.logout);
module.exports = router;
