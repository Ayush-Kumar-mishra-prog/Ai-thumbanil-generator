import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email:String;
  password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim:true,lowercase:true },
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model<IUser>('User', UserSchema);
export default User;