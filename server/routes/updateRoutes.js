import express from 'express';
import {updateProfile, updateBlog, updatePR, updateRSA } from '../controllers/update/index.js';
import {addTask, deleteTask, editTask, addLevel, deleteLevel, editCourseIntro} from '../controllers/update/course.js'
import identityMW from '../middleware/identityMW.js';

const router = express.Router();

router.post('/profile/:id',identityMW,updateProfile);
router.post('/blog/:id', identityMW, updateBlog);
router.post('/pr/:id', identityMW, updatePR);
router.post('/rsa/:id', identityMW, updateRSA);
//course editing.
router.post('/course/addTask/:id', identityMW, addTask);
router.post('/course/deleteTask/:id', identityMW, deleteTask);
router.post('/course/editTask/:id', identityMW, editTask);
router.post('/course/addLevel/:id', identityMW, addLevel);
router.post('/course/deleteLevel/:id', identityMW, deleteLevel);
router.post('/course/editIntro/:id', identityMW, editCourseIntro)

export default router;