import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  email:string
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model<IUser>("User", userSchema);