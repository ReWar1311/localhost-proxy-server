import { proxy } from './src/index.js';
import dotenv from 'dotenv';

dotenv.config();
const token = process.env.TOKEN;

proxy.start(3000);

proxy.addRoute('/api/mailbox', 'https://web2.temp-mail.org/mailbox', {
  method: 'GET',
  headers: {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": `Bearer ${token}`,
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "referer": "https://temp-mail.org/",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors"
  }
});

setTimeout(async () => {
  const response = await fetch("http://localhost:3000/api/mailbox", {});
  console.log(response);
}, 10000);

console.log('Proxy setup done');