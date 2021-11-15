import express from 'express';
import {getCourse, getProfile, getSubmissionsStuBlog,getSubmissionsStuPr, getBlog, getPR} from '../controllers/get.js';
import identityMW from '../middleware/identityMW.js'

const router = express.Router();

router.get('/course/:id', getCourse);
router.get('/profile/:id', getProfile);
router.get('/submissionsStu/blog', identityMW ,getSubmissionsStuBlog);
router.get('/submissionsStu/pr', identityMW ,getSubmissionsStuPr);
router.get('/pr/:id', getPR);
router.get('/blog/:id', getBlog);

export default router;