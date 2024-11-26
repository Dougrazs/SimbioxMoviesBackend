import express from 'express'
import { signUpController } from '../../controllers/signUpController'
import { deleteUserController } from '../../controllers/deleteUserController'
import { updateUserController } from '../../controllers/updateUserController'
import { getUserByIdController } from '../../controllers/getUserController'
const router = express.Router()

router.get('/user/:id', getUserByIdController)
router.post('/user/signup', signUpController)
router.delete('/user/delete', deleteUserController)
router.put('/user/update', updateUserController)

export default router
