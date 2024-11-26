import express from 'express'
import config from './config/envConfig'
import { userRoute, moviesRoute, favoritesRoute, protectedRoute, authRoute } from './api'
import generateJwtSecret from './config/jwtSecretConfig'
import connectDB from './config/dbConfig'
import { corsMiddleware } from './config/cors'
import dotenv from 'dotenv'
async function startServer(): Promise<void> {
  if (!config.JWTSECRET) {
    generateJwtSecret()
    dotenv.config()
  }

  const app = express()
  app.use(corsMiddleware)
  app.use(express.json())
  await connectDB()

  app.use('/api', userRoute)
  app.use('/api', moviesRoute)
  app.use('/api', favoritesRoute)
  app.use('/api', protectedRoute)
  app.use('/api', authRoute)

  app.listen(config.PORT, () => {
    console.log(`SERVER RODANDO NO PORT: ${config.PORT} `)
  })
}

void startServer().catch(console.error)
