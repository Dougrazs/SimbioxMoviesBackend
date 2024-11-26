interface AddFavoriteMovieRequest {
  userId: string
  movieId: number
}

export function isAddFavoriteMovieRequest(body: any): body is AddFavoriteMovieRequest {
  return (
    typeof body.userId === 'string' &&
    typeof body.movieId === 'number'
  )
}
