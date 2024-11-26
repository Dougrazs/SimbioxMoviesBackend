import nodemailer from 'nodemailer'
import config from './envConfig'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.EMAILUSER,
    pass: config.EMAILPASS
  }
})
