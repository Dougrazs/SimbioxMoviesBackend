import mongoose from 'mongoose'
import { type IUser } from '../types/userTypes'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  profilePhoto: {
    type: String,
    required: false,
    default: ''
  },
  movies: [
    {
      movieId: {
        type: Number,
        required: true
      }
    }
  ]
}, {
  timestamps: true,
  versionKey: false
})

const User = mongoose.model<IUser>('User', userSchema)

export default User
