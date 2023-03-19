import { Schema, model, SchemaDefinition } from "mongoose";

export const NoteDefinition: SchemaDefinition = {
  text: String,
  userId: Number,
  remindDate: Date,
};

const noteSchema = new Schema(NoteDefinition, { timestamps: true });

export const NoteModel = model("Note", noteSchema);

export interface Note {
  text?: string;
  remindDate?: Date;
  userId?: number;
}
