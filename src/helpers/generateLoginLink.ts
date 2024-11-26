import jwt from 'jsonwebtoken'
import config from '../config/envConfig'
import { type ILogin } from '../types/loginControllerTypes'

export const generateLoginLink = ({ email }: ILogin): string => {
  const payload = {
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60
  }

  const token = jwt.sign(payload, config.JWTSECRET)

  return `${config.BASEURL}/signin?token=${token}`
}
