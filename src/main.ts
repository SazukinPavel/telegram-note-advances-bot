import { Telegraf } from "telegraf";

const bot = new Telegraf("6163566945:AAEU4D8JfyzcJ4LHliekDLmUIOxo4_OUyZY");

bot.start(() => {
  console.log("start");
});

bot.hears("a", (data) => {
  console.log(data);
});

bot.launch()