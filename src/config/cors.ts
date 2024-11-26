import cors from 'cors'
import config from './envConfig'

const corsOptions = {
  origin: config.BASEURL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

export const corsMiddleware = cors(corsOptions)
