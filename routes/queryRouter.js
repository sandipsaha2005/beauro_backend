import express from 'express'
import {createQuery,getAllQuery} from '../controllers/queryController.js'
import { isAdmin, isAuthorized } from '../middlewares/auth.js'
const router = express.Router()

router.post('/create-query',isAuthorized,createQuery)
router.get('/get-all-query',isAdmin,getAllQuery)

export default router;