import mongoose from 'mongoose'
import config from './envConfig'

const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(config.MONGOURI)

    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
