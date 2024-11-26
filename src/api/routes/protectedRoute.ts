import express from 'express'
import { getProtectedData } from '../../controllers'
import { authMiddleware } from '../../middlewares'

const router = express.Router()

router.post('/protectedroute', authMiddleware, getProtectedData)

export default router
