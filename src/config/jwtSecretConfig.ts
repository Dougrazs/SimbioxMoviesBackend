import fs from 'fs'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET_ROTATION_INTERVAL = 24 * 60 * 60 * 1000

function generateJwtSecret(): void {
  const currentTimestamp = Date.now()
  const lastRotation = parseInt(process.env.JWT_SECRET_TIMESTAMP ?? '0', 10)

  if (lastRotation === 0) {
    console.log('First rotation, setting initial JWT_SECRET_TIMESTAMP')
  }

  if (currentTimestamp - lastRotation >= JWT_SECRET_ROTATION_INTERVAL || lastRotation === 0) {
    const key = crypto.randomBytes(32)
    const base64Key = key.toString('base64')

    let envContent = fs.readFileSync('.env', 'utf8')
    console.log('Existing .env content before update:', envContent)

    const jwtSecretRegex = /^JWT_SECRET=.*/m
    if (jwtSecretRegex.test(envContent)) {
      envContent = envContent.replace(jwtSecretRegex, `JWT_SECRET=${base64Key}`)
    } else {
      envContent += `JWT_SECRET=${base64Key}\n`
    }

    const jwtTimestampRegex = /^JWT_SECRET_TIMESTAMP=.*/m
    if (jwtTimestampRegex.test(envContent)) {
      envContent = envContent.replace(jwtTimestampRegex, `JWT_SECRET_TIMESTAMP=${currentTimestamp}`)
    } else {
      envContent += `JWT_SECRET_TIMESTAMP=${currentTimestamp}\n`
    }
    fs.writeFileSync('.env', envContent)
    dotenv.config()

    console.log('New JWT_SECRET added and timestamp updated.')
  } else {
    console.log('JWT_SECRET is still valid, no change required.')
  }
}

export default generateJwtSecret
