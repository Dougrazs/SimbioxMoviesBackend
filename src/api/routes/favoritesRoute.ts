import express from 'express'
import { addMovieToFavoritesController, getFavoriteMoviesController, removeMovieFromFavoritesController } from '../../controllers'

const router = express.Router()

router.get('/user/:userId/favorites', getFavoriteMoviesController)
router.post('/user/:userId/favorites/:movieId', addMovieToFavoritesController)
router.delete('/user/:userId/favorites/:movieId', removeMovieFromFavoritesController)

export default router
