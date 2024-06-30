import express from 'express';
import { AddTask, allList, deleteTask, updatedTask } from '../controllers/task.js';
import { isAuthenticated } from '../middleware/auth.js';
const router = express.Router()

console.log("aman")
router.post('/addtask', isAuthenticated, AddTask)
router.get('/allList', isAuthenticated, allList)
router.route('/:id').put(isAuthenticated, updatedTask).delete(isAuthenticated, deleteTask)




export default router;