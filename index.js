import TikTokLiveConnection from "tiktok-live-connector";
import donations from "./donation.js";
import { Rcon } from "rcon-client";

// 👤 Игрок, от имени которого выполняются команды
const playerName = "Cryptowooman";

// 🔧 Настройки RCON
const rconConfig = {
    host: "127.0.0.1",
    port: 25575,
    password: "1234"
};

// 🚀 Отправка команды на сервер
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

// 📊 Счётчики донатов
const giftCounters = {
    "Rose": 0
};

// 🎥 Подключаемся к TikTok
const tiktokUsername = "Cryptowooman"; // замени на свой ник
const tiktok = new TikTokLiveConnection(tiktokUsername);

// 🔌 Запуск соединения
tiktok.connect()
    .then(() => console.log("✅ Подключено к TikTok Live"))
    .catch(err => console.error("❌ Ошибка подключения:", err));

// 🎁 Обработка реальных донатов
tiktok.on("gift", async (data) => {
    console.log(`⚡ ${data.uniqueId} отправил ${data.giftName} x${data.repeatCount}`);

    const commands = donations[data.giftName];
    if (commands) {
        for (let i = 0; i < data.repeatCount; i++) {
            for (let cmd of commands) {
                await sendCommand(`execute ${playerName} ~ ~ ~ ${cmd}`);
            }
        }
    } else {
        console.log("Нет правил для подарка:", data.giftName);
    }

    // ✅ Логика для Rose
    if (data.giftName === "Rose") {
        giftCounters.Rose += data.repeatCount;
        console.log(`🌹 Всего роз: ${giftCounters.Rose}`);

        if (giftCounters.Rose >= 100) {
            console.log("💥 Достигнут лимит 100 роз — СПАВНИМ ГИГАНТСКИЙ TNT!");
            await sendCommand(`bigboom ${playerName}`);
            await sendCommand(`say 💣 ГИГАНТСКИЙ TNT ЗА 100 РОЗ!`);
            giftCounters.Rose = 0; // сброс счётчика
        }
    }
});
