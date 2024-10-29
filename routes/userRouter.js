import express from 'express'
import {login,register,me} from '../controllers/userController.js'
import { isAuthorized } from '../middlewares/auth.js'
const router = express.Router()

router.post('/login',login)
router.get('/me',isAuthorized,me)
router.post('/register',register)

export default router;