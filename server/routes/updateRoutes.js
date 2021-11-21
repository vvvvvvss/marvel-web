import express from 'express';
import {updateProfile, updateBlog, updatePR} from '../controllers/update.js';
import identityMW from '../middleware/identityMW.js';

const router = express.Router();

router.post('/profile/:id',identityMW,updateProfile);
router.post('/blog/:id', identityMW, updateBlog);
router.post('/pr/:id', identityMW, updatePR);
// router.post('/rsa/:id', identityMW, updateRsa);

export default router;