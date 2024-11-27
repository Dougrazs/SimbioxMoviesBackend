import { type Response } from 'express'
import config from '../config/envConfig'

export const setAuthCookie = (token: string, res: Response): void => {
  res.cookie('auth_token_simbiox', token, {
    httpOnly: true,
    secure: true,
    maxAge:  24 * 60 * 60 * 1000,
    sameSite: 'none',
    path: '/'
  })
}
