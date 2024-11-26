import { getUserById } from '../services/userService'
import { type Request, type Response } from 'express'

export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id

  if (typeof userId !== 'string') {
    res.status(400).json({ message: 'Invalid user ID format' })
    return
  }

  try {
    const user = await getUserById(userId)

    if (user) {
      res.status(200).json({ user })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ message: 'Error fetching user' })
  }
}
