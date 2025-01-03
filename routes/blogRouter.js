import express from 'express'
import {createBlog,updateBlog,getAllBlog, getOneBlog, getQa, deleteBlog} from '../controllers/blogController.js'
import { isAdmin, isAuthorized } from '../middlewares/auth.js'
const router = express.Router()

router.post('/create-blog', isAdmin, createBlog);
router.post('/update-blog', isAdmin, updateBlog);
router.post('/delete-blog', isAdmin, deleteBlog);
router.get('/get-blogs', getAllBlog);
router.get('/get-blogs-admin', isAdmin, getAllBlog);
router.post('/get-one-blog', getOneBlog);
router.post('/get-one-blog-admin', isAdmin, getOneBlog);
router.post('/get-qa',getQa);

export default router;