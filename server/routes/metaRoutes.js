import { Router } from "express";
import identityMW from "../middleware/identityMW.js"; 
import { hasSubmittedPr } from "../controllers/meta.js";

const router = Router();

router.get('/hasSubmittedPr', identityMW, hasSubmittedPr);

export default router;