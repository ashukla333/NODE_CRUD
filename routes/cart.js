import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { createCart, getCartById, removeCart,getCartData } from '../controllers/cart.js';

const router=express.Router()

router.post('/createCart',isAuthenticated,createCart)
router.get('/:id',isAuthenticated,getCartById)
router.delete('/removeToCart',isAuthenticated,removeCart)
router.get('/getCartData/:id',isAuthenticated,getCartData)

export default router