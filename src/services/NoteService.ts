import { Note, NoteDefinition, NoteModel } from "../schemas/Note.js";

export default class NoteService {
  static create(note: Note) {
    const bdNote = new NoteModel({ ...note });

    return bdNote.save();
  }

  static findByUserId(userId: number) {
    return NoteModel.find({ userId });
  }
}
