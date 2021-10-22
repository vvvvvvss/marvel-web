import express from 'express';

const router = express.Router();

router.get('/auth', authController);

export default router;