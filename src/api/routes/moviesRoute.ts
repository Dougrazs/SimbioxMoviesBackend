import express from 'express'
import { getPopularMoviesController, searchMoviesController, getMovieDetailsController } from '../../controllers'

const router = express.Router()

router.get('/popular', getPopularMoviesController)
router.get('/movies/search', searchMoviesController)
router.get('/movie/:movieId', getMovieDetailsController)

export default router
