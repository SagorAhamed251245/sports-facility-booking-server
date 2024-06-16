import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema: Schema<TUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, trim: true },
    role: { type: String, required: true, enum: ['admin', 'user'] },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<TUser>('User', userSchema);
export default User;
