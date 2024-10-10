
import express from 'express';
import { routes } from './routes/routes.js';
import cors from 'cors';
import { Telegraf, Markup } from 'telegraf';
import { PostgresModel } from "../src/db/db.js";  // Assuming this is your database model

const token = '7122357451:AAEFq46iHnMDxoTS-1tRqqcVClEEVd12g5E';
const newToken ='7159558560:AAHAj8AamuB7i7hmML768_pt62-EB69KJYI'
const bot = new Telegraf(token);

const app = express();
const webAppUrl = 'https://winnie-coin.vercel.app/';
const Community = 'https://t.me/winnie_coin';
const imageUrl = 'https://tgram-ten.vercel.app/win.png';
const support = 'https://t.me/winnie_coin';
const forAds = 'https://t.me/winnie_coin';
const Youtube = 'https://t.me/winnie_coin';
const twitter = 'https://t.me/winnie_coin';
const instagram = 'https://t.me/winnie_coin';

const PORT = 9090;

app.use(cors());
app.use(express.json());
app.use('/', routes);

const db = new PostgresModel();

bot.start((ctx) => {
    // Extract referral code from the message, if available
    const referralCode = ctx.message.text.split(' ')[1];  
  
    // Define buttons
    const buttons = [
      [Markup.button.webApp('💰 Play & Earn', webAppUrl)],
      [Markup.button.url('🌐 Open Community ', Community)],
  [Markup.button.url('📹 Youtube', Youtube),Markup.button.url('🐦 Twitter', twitter),Markup.button.url('📸 Instagram', instagram)],

    //   [Markup.button.url('💸 Support', support),Markup.button.url('📈 For Ads', forAds)],
  
    ];

      ctx.replyWithPhoto(
        { url: imageUrl }, // You can also use a local file path or a file ID here
        {
          caption: 'Бот запустился! Нажмите на кнопку ниже для запуска приложения!',
         reply_markup: { inline_keyboard: buttons }
        }
      );
  });
bot.launch();
console.log('Bot is running...');

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


