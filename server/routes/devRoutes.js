import express from "express";
import { createCourse} from '../controllers/dev.js';

const router = express.Router();

router.post('/createCourse', createCourse)

export default router;