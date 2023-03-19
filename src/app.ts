import TelegramBot from "node-telegram-bot-api";
import * as mongoose from "mongoose";
import AddCommand from "./commands/AddCommand.js";
import ListCommand from "./commands/ListCommand.js";
import StartCommand from "./commands/StartCommand.js";

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
      console.log("connection successfully");
    } catch (e) {
      console.log("ERROR:", e);
    }
  }

  configureBot() {
    const commands = [new AddCommand(), new ListCommand(), new StartCommand()];

    commands.forEach((command) => {
      this.bot.onText(command.route, (msg) => command.execute(this.bot, msg));
    });
  }
}

export default App;
