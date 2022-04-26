import express from 'express';
import identityMW from '../middleware/identityMW.js';
import { submitFeedbackBlog, submitFeedbackPr, approveBlog, approvePR, deleteBlog, deleteRsa } from '../controllers/actions.js';

const router = express.Router();

router.post('/feedback/blog/:id', identityMW, submitFeedbackBlog);
router.post('/feedback/pr/:id', identityMW, submitFeedbackPr);
router.post('/approve/pr/:id', identityMW, approvePR);
router.post('/approve/blog/:id', identityMW, approveBlog);
router.post('/delete/blog/:id', identityMW, deleteBlog);
router.post('/delete/rsa/:id', identityMW, deleteRsa)

export default router;