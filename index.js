import TikTokLiveConnection from 'tiktok-live-connector';
import { Rcon } from 'rcon-client';
import donations from './donations.js';

// Настройки TikTok
const tiktokUsername = "твой_ник_в_tiktok"; 

// Настройки RCON
const rconConfig = {
    host: "127.0.0.1",  // если сервер локальный
    port: 25575,
    password: "1234"
};

// Функция отправки команды в Minecraft
async function sendCommand(cmd) {
    try {
        const rcon = await Rcon.connect(rconConfig);
        const res = await rcon.send(cmd);
        console.log("→ Выполнено:", cmd, "| Ответ:", res);
        rcon.end();
    } catch (err) {
        console.error("Ошибка RCON:", err);
    }
}

// Подключаемся к TikTok
let tiktok = new TikTokLiveConnection(tiktokUsername);

tiktok.connect().then(() => {
    console.log("✅ Подключено к TikTok Live");
});

// Обработка донатов
tiktok.on('gift', async (data) => {
    console.log(`${data.uniqueId} отправил ${data.giftName} x${data.repeatCount}`);

    const commands = donations[data.giftName];
    if (commands) {
        for (let cmd of commands) {
            await sendCommand(cmd);
        }
    } else {
        console.log("Нет правил для подарка:", data.giftName);
    }
});
