import BaseBotCommand from "../models/BaseBotCommand.js";
import TelegramBot, { Message } from "node-telegram-bot-api";
import { Note } from "../schemas/Note.js";
import moment from "moment";
import NoteService from "../services/NoteService.js";

export default class ListCommand extends BaseBotCommand {
  constructor() {
    super(/\/list/);
  }

  async execute(bot: TelegramBot, msg: Message): Promise<void> {
    const notes = await NoteService.findByUserId(msg.chat.id);
    if (notes.length < 1) {
      bot.sendMessage(msg.chat.id, "Notes empty (");
      return;
    }

    notes.forEach((n) => {
      bot.sendMessage(
        msg.chat.id,
        `Text: ${n.text} \nRemind date: ${moment(n.remindDate).format(
          "DD:MM:SS"
        )}`
      );
    });
  }
}
