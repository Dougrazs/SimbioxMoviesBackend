import { type Request, type Response } from 'express'
import { addMovieToFavorites } from '../services'
import { isAddFavoriteMovieRequest } from '../types/addMovieToFavoritesTypeGuard'

export const addMovieToFavoritesController = async (req: Request, res: Response): Promise<void> => {
  const body = req?.body

  try {
    if (!isAddFavoriteMovieRequest(body)) {
      res.status(400).json({ message: 'Missing required parameters' })
      return
    }

    const { userId, movieId } = body
    const updatedUser = await addMovieToFavorites(userId, movieId)

    res.status(200).json({
      message: 'Movie added to favorites successfully',
      user: updatedUser
    })
  } catch (error) {
    console.error('Error in addMovieToFavoritesController:', error)
    res.status(500).json({ message: 'Failed to add movie to favorites', error: error.message })
  }
}
