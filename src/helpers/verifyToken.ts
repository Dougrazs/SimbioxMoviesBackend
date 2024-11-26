import jwt from 'jsonwebtoken'
import config from '../config/envConfig'

export const verifyToken = (token: string): any => {
  const secretKey = config?.JWTSECRET

  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}
