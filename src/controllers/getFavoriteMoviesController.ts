import { type Request, type Response } from 'express'
import { getFavoriteMovies } from '../services'

const getFavoriteMoviesController = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req?.params
  try {
    const favoriteMovies = await getFavoriteMovies(userId)

    res.status(200).json({
      message: 'Favorite movies retrieved successfully.',
      favoriteMovies
    })
  } catch (error) {
    console.error('Error in getting favorite movies:', error)
    res.status(500).json({ message: 'Error fetching favorite movies', error: error.message })
  }
}

export { getFavoriteMoviesController }
