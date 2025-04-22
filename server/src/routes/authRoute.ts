import express from "express"
import { getDashboard, login, signup } from '../controller/authController';
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get('/', authMiddleware, getDashboard);
router.post('/login', login);
router.post('/signup', signup);

export default router;
