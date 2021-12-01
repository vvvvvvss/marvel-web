import express from 'express';
import identityMW from '../middleware/identityMW.js';
import { submitFeedbackBlog, submitFeedbackPr, approveBlog, approvePR, toggleSub } from '../controllers/actions.js';

const router = express.Router();

router.post('/feedback/blog/:id', identityMW, submitFeedbackBlog);
router.post('/feedback/pr/:id', identityMW, submitFeedbackPr);
router.post('/approve/pr/:id', identityMW, approvePR);
router.post('/approve/blog/:id', identityMW, approveBlog);
router.post('/togglesub/:id', identityMW, toggleSub);

export default router;