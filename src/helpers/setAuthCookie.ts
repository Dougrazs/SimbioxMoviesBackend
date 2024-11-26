import { type Response } from 'express'
import config from '../config/envConfig'

export const setAuthCookie = (token: string, res: Response): void => {
  res.cookie('auth_token_simbiox', token, {
    httpOnly: true,
    secure: config.NODEENV === 'production',
    maxAge: 3600000,
    sameSite: config.NODEENV === 'production',
    path: '/'
  })
}
