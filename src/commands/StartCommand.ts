import BaseBotCommand from "../models/BaseBotCommand.js";
import TelegramBot, { Message } from "node-telegram-bot-api";

export default class StartCommand extends BaseBotCommand {
  constructor() {
    super(/\/start/);
  }

  async execute(bot: TelegramBot, msg: Message): Promise<void> {
    bot.sendMessage(msg.chat.id, "some message", {
      reply_markup: {
        keyboard: [
          [
            {
              text: "/list",
            },
          ],
          [
            {
              text: "/add",
            },
          ],
          [
            {
              text: "/help",
            },
          ],
        ],
      },
    });
  }
}
