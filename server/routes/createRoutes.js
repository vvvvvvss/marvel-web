import express from 'express';
import {createPR, createBlog, createRSA} from '../controllers/create.js'
import identityMW from '../middleware/identityMW.js';

const router = express.Router();

router.post('/pr', identityMW ,createPR);
router.post('/blog', identityMW , createBlog);
router.post('/rsa', identityMW, createRSA)

export default router;