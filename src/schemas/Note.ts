import { Schema, model } from "mongoose";

const noteSchema = new Schema({ text: String }, { timestamps: true });

export const Note = model("Note", noteSchema);
