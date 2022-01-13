import express from "express";
import { assignIns, createCourse, play, play2, play3} from '../controllers/dev.js';

const router = express.Router();

router.post('/createCourse', createCourse);
router.post('/assignIns', assignIns);
router.post('/play', play);
router.post('/play2', play2);
router.post('/play3', play3);

export default router;