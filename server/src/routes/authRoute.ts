import express from "express"

import { deleteUser, getDashboard, login, searchUser, signup, changePassword } from '../controller/authController';
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get('/', authMiddleware, getDashboard);
router.post('/login', login);
router.post('/signup', signup);
router.post('/deleteUser', deleteUser);
router.post('/searchUser', searchUser);
router.post('/changePassword', changePassword);

export default router;
