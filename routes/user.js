import express from 'express'
import { createUser, deleteUser, getAllUser, getByID, updateUser } from '../controllers/user.js'
const router = express.Router()

router.get('/all', getAllUser)
router.get('/getbyID/:id', getByID)
router.post("/new", createUser)
router.put("/update/:id", updateUser)
router.delete("/delete/:id", deleteUser)

export default router;