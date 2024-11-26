import cors from 'cors'

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

export const corsMiddleware = cors(corsOptions)
