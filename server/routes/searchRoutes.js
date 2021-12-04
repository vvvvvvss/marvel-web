import express from 'express';
import identityMW from '../middleware/identityMW';

const router = express.Router();

router.get('/rsa', identityMW, searchRsa);
router.get('/pr', );
router.get('/blog', searchBlog);