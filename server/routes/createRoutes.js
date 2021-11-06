import express from 'express';
import {createPR, createBlog} from '../controllers/create.js'
import { identityMW } from '../middleware/identityMW.js';

const router = express.Router();

router.post('/pr', identityMW ,createPR);
router.post('/blog', identityMW , createBlog);

export default router;