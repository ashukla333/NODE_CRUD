import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { createWishlist ,getWishlistByProductId, removeWishlist} from '../controllers/wishlist.js';

const router=express.Router()

router.post('/createWishlist',isAuthenticated,createWishlist)
router.get('/:id',isAuthenticated,getWishlistByProductId)
router.delete('/removeWishList',isAuthenticated,removeWishlist)




export default router;