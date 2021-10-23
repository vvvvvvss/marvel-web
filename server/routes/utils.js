import express from 'express';
import {authController} from '../controllers/auth.js';

const router = express.Router();

router.post('/auth', authController);

export default router;