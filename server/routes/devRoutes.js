import express from "express";
import { createCourse} from '../controllers/dev.js';

const router = express.Router();

router.get('/createCourse', createCourse)

export default router;