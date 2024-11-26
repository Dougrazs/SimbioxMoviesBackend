import { type Request, type Response } from 'express'
export interface ILogin {
  email: string
  name?: string
  req?: Request
  res?: Response
}
