import TelegramBot from "node-telegram-bot-api";
import * as mongoose from "mongoose";
import { Note } from "./schemas/Note.js";

class App {
  private telegramId: string;
  // @ts-ignore
  private bot: TelegramBot;
  constructor(telegramId: string) {
    this.telegramId = telegramId;
  }

  async start() {
    console.log("start connect");
    try {
      await mongoose.connect("mongodb://mongo:27017/notes");
      this.bot = new TelegramBot(this.telegramId, { polling: true });
      this.configureBot();
      console.log("good");
    } catch (e) {
      console.log("ERROR:", e);
    }
  }

  configureBot() {
    this.bot.onText(/\/start/, (msg) => {
      this.bot.sendMessage(msg.chat.id, "some message", {
        reply_markup: {
          keyboard: [
            [
              {
                text: "list",
              },
            ],
            [
              {
                text: "add",
              },
            ],
            [
              {
                text: "help",
              },
            ],
          ],
        },
      });
    });

    this.bot.onText(/list/, (msg) => {
      this.bot.sendMessage(msg.chat.id, "you send list");
    });

    this.bot.onText(/add/, async (msg) => {
      const message = await this.bot.sendMessage(msg.chat.id, "3");
      this.bot.onReplyToMessage(
        msg.chat.id,
        message.message_id,
        async (msg) => {
          const note = new Note({ text: msg.text });
          await note.save();
        }
      );
    });
    this.bot.onText(/list/, async (msg) => {
      const notes = await Note.find();
      console.log(notes);
      console.log(notes.join(" "));
      this.bot.sendMessage(msg.chat.id, notes.join(" "));
    });
  }
}

export default App;
