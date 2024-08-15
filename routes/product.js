import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { createProduct, getProduct ,deleteProduct,getProductById,ProductByCategoryId,updateProduct} from '../controllers/product.js';

const router=express.Router()


router.post('/createProduct',isAuthenticated,createProduct)
router.get('/getProduct',getProduct)
router.get('/:id',getProductById)
router.get('/ProductByCategoryId/:id',ProductByCategoryId)
router.route('/:id').put(isAuthenticated,updateProduct).delete(isAuthenticated,deleteProduct)
// router.get("/search",isAuthenticated,getSearch)





export default router;