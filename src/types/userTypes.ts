export interface IUser {
  _id?: string
  name: string
  email: string
  movies: Array<{
    movieId: number
  }>
}
