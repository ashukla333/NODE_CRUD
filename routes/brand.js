import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { createBrand, getBrand, getBrandByID ,deleteBrand, updateBrandById} from '../controllers/brand.js';

const router=express.Router()


router.post('/createBrand',isAuthenticated,createBrand)
router.get('/getBrand',isAuthenticated,getBrand)
router.get('/getBrandByID/:id',isAuthenticated,getBrandByID)
router.route('/:id').put(isAuthenticated, updateBrandById).delete(isAuthenticated, deleteBrand)

export default router;