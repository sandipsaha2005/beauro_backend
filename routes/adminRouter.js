import express from 'express'
import {login,register,me} from '../controllers/adminController.js'
import { isAdmin } from '../middlewares/auth.js'
const router = express.Router()

router.post('/login-admin',login)
router.get('/me-admin',isAdmin,me)
router.post('/register-admin',register)

export default router;