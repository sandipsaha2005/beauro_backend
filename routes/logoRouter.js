import express from 'express'
import { deleteLogo, getAllLogo,createLogo } from '../controllers/logoController.js'
import { isAdmin, isAuthorized } from '../middlewares/auth.js'


const router = express.Router()
router.post('/create-logo',isAdmin,createLogo)
router.post('/delete-logo',isAdmin,deleteLogo)
router.get('/get-logo',getAllLogo)


export default router;