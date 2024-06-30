import express from 'express'
import {  MyprofileDetail, logOutUser, loginUser, ragisterUser} from '../controllers/user.js'
import { isAuthenticated } from '../middleware/auth.js'
const router = express.Router()

router.post('/addUser',ragisterUser)
router.post('/login',loginUser)
router.get('/logOut',logOutUser)
router.get('/MyprofileDetail',isAuthenticated,MyprofileDetail)

export default router;