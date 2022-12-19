import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: String,
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: String,
  },
  {
    timestamps: true,
  }
);

export default model('User', userSchema);
