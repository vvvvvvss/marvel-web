import express from 'express';
import {getCourse, getProfile, getSubmissionsBlog, getSubmissionsPr, getSubmissionsRsa, getBlog, getPR, getRsa, getToReviewPrs, getToReviewBlogs} from '../controllers/get.js';
import identityMW from '../middleware/identityMW.js'
import optionalMW from '../middleware/optionalMW.js';

const router = express.Router();

router.get('/course/:id', getCourse);
router.get('/profile/:id', getProfile);
router.get('/submissions/blog', identityMW ,getSubmissionsBlog);
router.get('/submissions/pr', identityMW , getSubmissionsPr);
router.get('/submissions/rsa', identityMW, getSubmissionsRsa);
router.get('/pr/:id', optionalMW , getPR);
router.get('/blog/:id',optionalMW ,getBlog);
router.get('/rsa/:id', identityMW, getRsa);
router.get('/toreview/pr', identityMW, getToReviewPrs);
router.get('/toreview/blog', identityMW, getToReviewBlogs);


export default router;