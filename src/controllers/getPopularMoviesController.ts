import { type Request, type Response } from 'express'
import { getPopularMovies } from '../services'

export const getPopularMoviesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await getPopularMovies()
    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch popular movies' })
  }
}
