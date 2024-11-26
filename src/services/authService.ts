import { verifyToken, generateLoginLink } from '../helpers'
import { type ILogin } from '../types/loginControllerTypes'

export const loginLink = ({ email, req }: ILogin): string => {
  const authHeader = req?.headers.authorization
  const token = authHeader?.split(' ')[1]
  const isVerified = token ? verifyToken(token) : false

  if (isVerified) {
    return `Login successful for email: ${email}`
  } else {
    const loginLink = generateLoginLink({ email })
    return loginLink
  }
}
