import BaseBotCommand from "../models/BaseBotCommand.js";
import TelegramBot, { Message } from "node-telegram-bot-api";
import DateService from "../services/DateService.js";
import { Note } from "../schemas/Note.js";
import NoteService from "../services/NoteService.js";

export default class AddCommand extends BaseBotCommand {
  constructor() {
    super(/\/add/);
  }

  async execute(bot: TelegramBot, msg: Message): Promise<void> {
    const addMessage = await bot.sendMessage(
      msg.chat.id,
      "Reply on this message"
    );

    bot.onReplyToMessage(msg.chat.id, addMessage.message_id, async (msg) => {
      const textNote = msg.text;

      await bot.sendMessage(msg.chat.id, "Set timer or datetime?", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "TIMER",
                callback_data: JSON.stringify({
                  answer: "timer",
                }),
              },
              {
                text: "DATE",
                callback_data: JSON.stringify({
                  answer: "date",
                }),
              },
            ],
          ],
        },
      });

      bot.once("callback_query", async (cb) => {
        if (cb.data && cb.message) {
          const chatID = cb.message.chat.id;

          const { answer } = JSON.parse(cb.data) as {
            answer: "timer" | "date";
          };
          let messageText = "";

          if (answer === "date") {
            messageText = "Reply with date in format DD:HH:MM";
          } else if (answer === "timer") {
            messageText = "Reply with timer in format HH:MM";
          }

          const message = await bot.sendMessage(chatID, messageText);

          bot.onReplyToMessage(chatID, message.message_id, async (msg) => {
            try {
              const note: Note = { text: textNote };

              const remindDateText = msg.text || "";
              note.remindDate =
                answer === "date"
                  ? DateService.getDateByString(remindDateText)
                  : DateService.getDateWithTimeString(remindDateText);

              note.userId = msg.chat.id;

              await NoteService.create(note);

              return bot.sendMessage(chatID, "Note successfully added");
            } catch {
              return bot.sendMessage(chatID, "Bad date,try again");
            }
          });
        }
      });
    });
  }
}
