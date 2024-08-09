import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { createCategory } from '../controllers/category.js';

const router=express.Router()

router.post('/createCategory',isAuthenticated,createCategory)



export default router;