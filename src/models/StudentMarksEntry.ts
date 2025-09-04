import mongoose, { Document, Schema } from "mongoose";

export interface IStudentMarksEntry extends Document {
  name: string;
  marks: number;
  subject: string;
  grade: string;
  date: Date;
  user: mongoose.Types.ObjectId;
}

const studentMarksSchema = new Schema<IStudentMarksEntry>({
  name: { type: String, required: true },
  marks: { type: Number, required: true },
  subject: { type: String, required: true },
  grade: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.model<IStudentMarksEntry>("StudentMarksEntry", studentMarksSchema);
