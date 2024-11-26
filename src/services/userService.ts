import User from '../models/userModel'
import { type IUser } from '../types/userTypes'
import { type Response } from 'express'

const createNewUser = async ({ name, email, movies }: IUser, res: Response): Promise<void> => {
  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return
    }

    const newUser = new User({
      name,
      email,
      movies
    })

    const savedUser = await newUser.save()
    console.log('User created successfully:', savedUser)
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Internal server error')
  }
}

const deleteUser = async ({ email }: Partial<IUser>): Promise<IUser | null> => {
  try {
    const deletedUser = await User.findOneAndDelete({ email })
    return deletedUser
  } catch (error) {
    console.error('Error deleting user:', error)
    throw new Error('Error deleting user')
  }
}

const updateUser = async (
  email: string,
  { name, profilePhoto }: { name?: string, profilePhoto?: string }
): Promise<IUser | null> => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { name, profilePhoto } },
      { new: true, runValidators: true }
    )
    return updatedUser
  } catch (error) {
    console.error('Error updating user:', error)
    throw new Error('Error updating user')
  }
}

const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId).exec()

    return user
  } catch (error) {
    console.error('Error retrieving user by ID:', error)
    throw new Error('Error retrieving user')
  }
}

export { createNewUser, deleteUser, updateUser, getUserById }
