import express from "express";
import { assignIns, createCourse, play} from '../controllers/dev.js';

const router = express.Router();

router.post('/createCourse', createCourse);
router.post('/assignIns', assignIns);
router.post('/play', play);

export default router;