import express from 'express'
import {login,register,me,dashboardData} from '../controllers/adminController.js'
import { isAdmin } from '../middlewares/auth.js'
const router = express.Router()

router.post('/login-admin',login)
router.get('/me-admin',isAdmin,me)
router.get('/dashboard',isAdmin,dashboardData)
router.post('/register-admin',register)

export default router;