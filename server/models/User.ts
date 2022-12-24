import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { model, ObjectId, Schema, Document, Model } from 'mongoose';

// user schema -Document type
interface UserDocument extends Document {
  name?: string;
  username: string;
  mobile: string;
  password: string;
  role?: string;
  avatar?: string;
}

// user schema methods -Model type
interface UserModel extends UserDocument {
  comparePassword(password: string): any;
  generateToken(id: ObjectId): string;
}

// user schema
const userSchema = new Schema<UserDocument>(
  {
    name: String,
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
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

// hash password before save password in the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

// compare password
userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

// create jwt token
userSchema.methods.generateToken = function (id: ObjectId) {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User: Model<UserModel> = model<UserModel>('User', userSchema);

export default User;
