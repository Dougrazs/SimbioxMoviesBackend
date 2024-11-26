import { type Request, type Response, type NextFunction } from 'express'
import { verifyToken } from '../helpers'

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' })
    return
  }

  const isVerified = verifyToken(token)

  if (!isVerified) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' })
    return
  }

  next()
}
