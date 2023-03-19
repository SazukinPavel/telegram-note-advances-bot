import TelegramBot, { Message } from "node-telegram-bot-api";

export default interface ICommand {
  execute(bot: TelegramBot, msg: Message): void | Promise<void>;
}
