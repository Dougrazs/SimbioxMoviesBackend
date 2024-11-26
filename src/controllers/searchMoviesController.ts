import { type Request, type Response } from 'express'
import { searchMovies } from '../services'
import { type ParsedQs } from 'qs'

interface searchMovieParams {
  query?: string | string | null | ParsedQs[]
  page?: number | string | null | ParsedQs[]
}

export const searchMoviesController = async (req: Request, res: Response): Promise<void> => {
  const query = req?.query as searchMovieParams

  if (!query) {
    res.status(400).json({ message: 'Query parameter is required' })
    return
  }
  try {
    const searchResults = await searchMovies(query)
    res.status(200).json(searchResults)
  } catch (error) {
    res.status(500).json({ message: 'Could not search movies' })
  }
}
