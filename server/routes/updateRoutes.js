import express from 'express';
import {updateProfile} from '../controllers/update.js';
import { identityMW } from '../middleware/identityMW.js';

const router = express.Router();

router.post('/profile/:id',identityMW,updateProfile);

export default router;