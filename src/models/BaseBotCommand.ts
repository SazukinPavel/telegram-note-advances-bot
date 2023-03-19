import ICommand from "../interfaces/ICommand.js";
import TelegramBot, { Message } from "node-telegram-bot-api";

export default abstract class BaseBotCommand implements ICommand {
  private _route: RegExp;
  protected set route(route: RegExp) {
    this._route = route;
  }
  public get route(): RegExp {
    return this._route;
  }

  constructor(route: RegExp) {
    this._route = route;
  }
  abstract execute(bot: TelegramBot, msg: Message): void | Promise<void>;
}
