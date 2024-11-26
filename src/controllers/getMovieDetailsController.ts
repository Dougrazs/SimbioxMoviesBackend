import { type Request, type Response } from 'express'
import { getMovieDetails } from '../services'

export const getMovieDetailsController = async (req: Request, res: Response): Promise<void> => {
  const { movieId } = req.params
  const id = parseInt(movieId)
  if (!movieId) {
    res.status(400).json({ message: 'Movie ID is required' })
    return
  }
  try {
    const movieDetails = await getMovieDetails(id)
    res.status(200).json(movieDetails)
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch movie details' })
  }
}
