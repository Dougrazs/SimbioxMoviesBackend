import dotenv from 'dotenv'
import env from 'env-var'
import generateJwtSecret from './jwtSecretConfig'
import { type IEnvConfig } from '../types/envConfigTypes'

dotenv.config()

if (!process.env.JWT_SECRET) {
  generateJwtSecret()
  dotenv.config()
}

function initializeConfig(): IEnvConfig {
  return {
    TOKEN: env.get('TOKEN').required().asInt(),
    PORT: env.get('PORT').required().asInt(),
    EMAILUSER: env.get('EMAIL_USER').required().asString(),
    EMAILPASS: env.get('EMAIL_PASSWORD').required().asString(),
    JWTSECRET: env.get('JWT_SECRET').required().asString(),
    BASEURL: env.get('BASE_URL').required().asString(),
    MONGOURI: env.get('MONGO_URI').required().asString(),
    APIURL: env.get('API_URL').required().asString(),
    APIKEY: env.get('API_KEY').required().asString(),
    NODEENV: env.get('NODE_ENV').required().asString()
  }
}

const config = initializeConfig()

export default config
