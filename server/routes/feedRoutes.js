import express from 'express';
import identityMW from '../middleware/identityMW.js';
import { getRsaByCourse } from '../controllers/feed.js';

const router = express.Router();

router.get('/rsa/:id', identityMW, getRsaByCourse);

export default router;