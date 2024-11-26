import { type IUser } from '../types/userTypes'
import User from '../models/userModel'
import axios from 'axios'
import config from '../config/envConfig'

const params = {
  api_key: config.APIKEY,
  language: 'pt-BR',
  region: 'BR'
}

const getFavoriteMovies = async (userId: string): Promise<Pick<IUser, 'movies'>> => {
  try {
    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const movieIds = user.movies

    const moviePromises = movieIds.map(async (movie) => {
      const response = await axios.get(`${config.APIURL}/movie/${movie.movieId}`, {
        params
      })
      return response.data
    })

    const movies = await Promise.all(moviePromises)

    return { movies }
  } catch (error) {
    console.error('Error fetching favorite movies:', error)
    throw error
  }
}

const addMovieToFavorites = async (userId: string, movieId: number): Promise<IUser> => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    const movieExists = user.movies.some(movie => movie.movieId === movieId)

    if (movieExists) {
      throw new Error('Movie is already in favorites')
    }

    user.movies.push({ movieId })
    await user.save()

    return user
  } catch (error) {
    console.error('Error adding movie to favorites:', error)
    throw error
  }
}

const removeMovieFromFavorites = async (userId: string, movieId: number): Promise<IUser> => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    const movieIndex = user.movies.findIndex(movie => movie.movieId === movieId)

    if (movieIndex === -1) {
      throw new Error('Movie is not in favorites')
    }

    user.movies.splice(movieIndex, 1)
    await user.save()

    return user
  } catch (error) {
    console.error('Error removing movie from favorites:', error)
    throw error
  }
}

export { removeMovieFromFavorites, addMovieToFavorites, getFavoriteMovies }
