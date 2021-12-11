import express from 'express';
import identityMW from '../middleware/identityMW.js';
import {searchRsa, searchPr, searchBlog, searchUser, searchCourse} from '../controllers/search.js'

const router = express.Router();

router.get('/rsa', identityMW, searchRsa);
router.get('/pr', searchPr);
router.get('/blog', searchBlog);
router.get('/user', searchUser);
router.get('/course', searchCourse);

export default router;