import axios from 'axios'
import config from '../config/envConfig'
import { type IMovie } from '../types/movieTypes'

import { type ParsedQs } from 'qs'

const params = {
  api_key: config.APIKEY,
  language: 'pt-BR',
  region: 'BR'
}
async function getGenres(): Promise<Record<number, string>> {
  try {
    const response = await axios.get(`${config.APIURL}/genre/movie/list`, {
      params
    })
    const genreMap: Record<number, string> = {}
    response.data.genres.forEach((genre: { id: number, name: string }) => {
      genreMap[genre.id] = genre.name
    })
    return genreMap
  } catch (error) {
    console.error('Error fetching genres:', error)
    throw new Error('Could not fetch genres')
  }
}

async function getPopularMovies(): Promise<IMovie[]> {
  try {
    const genreMap = await getGenres()

    const response = await axios.get(`${config.APIURL}/movie/popular`, {
      params: { ...params, page: 1 }
    })

    const moviesWithGenres = response.data.results.map((movie: IMovie) => {
      const genres = movie.genre_ids.map((id) => genreMap[id] || 'Unknown').join(' - ')
      const simplifiedVoteAverage = Math.round(movie.vote_average * 10) / 10

      return { ...movie, genres, vote_average: simplifiedVoteAverage }
    })
    return moviesWithGenres
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    throw new Error('Could not fetch popular movies')
  }
}

interface searchMovieParams {
  query?: string | string | null | ParsedQs[]
  page?: number | string | null | ParsedQs[]
}
async function searchMovies({ query, page }: searchMovieParams): Promise<IMovie[]> {
  try {
    const response = await axios.get(`${config.APIURL}/search/movie`, {
      params: { ...params, query, page }
    })

    return response.data
  } catch (error) {
    console.error('Error searching movies:', error)
    throw new Error('Could not search movies')
  }
}

async function getMovieDetails(movieId: number): Promise<IMovie> {
  try {
    const response = await axios.get(`${config.APIURL}/movie/${movieId}`, {
      params
    })
    const castingResponse = await axios.get(`${config.APIURL}/movie/${movieId}/credits`, {
      params
    })
    const cast = castingResponse.data.cast
    const movie = response?.data
    return { ...movie, cast }
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error)
    throw new Error('Could not fetch movie details')
  }
}

export { getPopularMovies, searchMovies, getMovieDetails }
