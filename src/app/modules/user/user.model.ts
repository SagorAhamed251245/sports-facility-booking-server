import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
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
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

/* userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
}); */
const User = mongoose.model<TUser>('User', userSchema);
export default User;
