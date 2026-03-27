import express from 'express';
import { login,logout,verifyUser,register
 } from '../controller/AuthController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.get('/verify', isAuthenticated, verifyUser);
export default router;