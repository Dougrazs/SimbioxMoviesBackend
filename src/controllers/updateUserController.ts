import { updateUser } from '../services/userService'
import { type Request, type Response } from 'express'

export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  const email = req.body.email as string
  const name = req.body.name as string

  if (typeof email !== 'string' || typeof name !== 'string') {
    res.status(400).json({ message: 'Invalid input data' })
    return
  }

  try {
    const updatedUser = await updateUser(email, { name })

    if (updatedUser) {
      res.status(200).json({ message: 'User updated successfully', user: updatedUser })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ message: 'Error updating user' })
  }
}
