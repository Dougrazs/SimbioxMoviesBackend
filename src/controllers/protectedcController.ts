import { type Request, type Response } from 'express'
import User from '../models/userModel'
import { verifyToken, setAuthCookie } from '../helpers'

export const getProtectedData = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req?.headers.authorization ?? ''

  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authorization header is missing or invalid' })
  }

  const token = authHeader?.split(' ')[1]
  const isVerified = verifyToken(token)

  const { email } = isVerified
  const user = await User.findOne({ email })

  setAuthCookie(token, res)
  res.status(200).json({
    message: 'You have accessed protected data!',
    user: user ?? 'Anonymous User',
    token
  })
}
