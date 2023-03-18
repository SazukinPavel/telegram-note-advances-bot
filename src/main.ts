import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot('6163566945:AAEU4D8JfyzcJ4LHliekDLmUIOxo4_OUyZY', {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match?.[1]|| 'bad'; // the captured "whatever"
    bot.sendMessage(chatId, resp+chatId);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Received your message');
});