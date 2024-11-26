import { deleteUser } from '../services/userService'
import { type Request, type Response } from 'express'

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body

  if (!email) {
    res.status(400).send('Email is required to delete a user')
    return
  }

  try {
    const result = await deleteUser({ email })

    if (result) {
      res.status(200).send('User deleted successfully!')
    } else {
      res.status(404).send('User not found')
    }
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).send('Error deleting user')
  }
}
