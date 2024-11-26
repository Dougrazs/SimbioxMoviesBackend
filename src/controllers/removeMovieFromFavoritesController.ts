import { type Request, type Response } from 'express'
import { removeMovieFromFavorites } from '../services'

const removeMovieFromFavoritesController = async (req: Request, res: Response): Promise<void> => {
  const { userId, movieId } = req?.params
  console.log({ userId }, { movieId })
  try {
    const updatedUser = await removeMovieFromFavorites(userId, parseInt(movieId))

    res.status(200).json({
      message: 'Filme removido dos favoritos.',
      user: updatedUser
    })
  } catch (error) {
    console.error('Error in removing movie from favorites:', error)
    res.status(500).json({ message: 'Error removing movie from favorites', error: error.message })
  }
}

export { removeMovieFromFavoritesController }
