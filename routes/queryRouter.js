import express from 'express'
import {createQuery,getAllQuery, createInquiry,getAllInquiry,deleteInquiry,deletQuery} from '../controllers/queryController.js'
import { isAdmin, isAuthorized } from '../middlewares/auth.js'
const router = express.Router()

router.post('/create-query',createQuery)
router.get('/get-all-query',isAdmin,getAllQuery)
router.post('/delete-query',isAdmin,deletQuery)
router.post('/create-inquiry',createInquiry)
router.get('/get-inquiry',isAdmin,getAllInquiry)
router.post('/delete-inquiry',isAdmin,deleteInquiry)

export default router;