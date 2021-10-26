import express from 'express';
import {getCourse} from '../controllers/getRoutes.js';

const router = express.Router();

router.get('/course/:id', getCourse);

export default router;