import express from 'express';
import identityMW from '../middleware/identityMW.js';
import { getRsaByCourse, getPrByProfile,getBlogByProfile, getRsaByProfile,getCertByProfile } from '../controllers/feed.js';
import optionalMW from '../middleware/optionalMW.js';

const router = express.Router();

router.get('/rsa/:id', identityMW, getRsaByCourse);
router.get('/profile/pr/:id', optionalMW ,getPrByProfile);
router.get('/profile/blog/:id',optionalMW ,getBlogByProfile);
router.get('/profile/rsa/:id', getRsaByProfile);
router.get('/profile/cert/:id', getCertByProfile);


export default router;