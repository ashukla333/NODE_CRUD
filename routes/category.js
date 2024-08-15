import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { createCategory ,UpdateCategory,DeleteCategory,getCategoryByID,getCategory} from '../controllers/category.js';

const router=express.Router()

router.post('/createCategory',isAuthenticated,createCategory)
router.get('/getCategory',getCategory)
router.get('/getCategoryByID/:id',getCategoryByID)
router.route('/:id').put(isAuthenticated,UpdateCategory).delete(isAuthenticated,DeleteCategory)



export default router;