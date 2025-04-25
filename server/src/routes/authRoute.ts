import express from "express"

import { deleteUser, getDashboard, login, signup } from '../controller/authController';
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get('/', authMiddleware, getDashboard);
router.post('/login', login);
router.post('/signup', signup);
router.post('/deleteUser', deleteUser);

export default router;
