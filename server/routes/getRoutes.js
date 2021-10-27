import express from 'express';
import {getCourse, getProfile} from '../controllers/getRoutes.js';

const router = express.Router();

router.get('/course/:id', getCourse);
router.get('/profile/:id', getProfile);

export default router;