import { TikTokLiveConnection } from "tiktok-live-connector";
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

let likeCounter = 0;
let subCounter = 0;

// 🎥 Подключаемся к TikTok
const tiktokUsername = "Cryptowooman";
const tiktok = new TikTokLiveConnection(tiktokUsername);

// 🔌 Запуск соединения
tiktok.connect()
    .then(() => console.log("✅ Подключено к TikTok Live"))
    .catch(err => console.error("❌ Ошибка подключения:", err));

// 🎁 Обработка подарков
tiktok.on("gift", async (data) => {
    console.log(`⚡ ${data.uniqueId} отправил ${data.giftName} x${data.repeatCount}`);

    const rule = donations[data.giftName];
    if (rule) {
        let commands = [];

        if (Array.isArray(rule)) {
            commands = rule;
        } else if (typeof rule === "function") {
            commands = rule(data.repeatCount);
        }

        for (let cmd of commands) {
            await sendCommand(`execute ${playerName} ~ ~ ~ ${cmd}`);
        }
    } else {
        console.log("Нет правил для подарка:", data.giftName);
    }
});

// ❤️ Обработка лайков
tiktok.on("like", async (data) => {
    likeCounter += data.likeCount;
    console.log(`❤️ Лайки от ${data.uniqueId}: +${data.likeCount}, всего: ${likeCounter}`);

    if (likeCounter >= 10000) {
        console.log("🔥 Достигнуто 10k лайков — СПАВНИМ TNT!");
        await sendCommand(`execute ${playerName} ~ ~ ~ summon tnt ~ ~5 ~ {Fuse:40}`);
        await sendCommand(`say ❤️ TNT за 10.000 лайков!`);
        likeCounter = 0;
    }
});

// ✨ Обработка подписок
tiktok.on("subscribe", async (data) => {
    subCounter += 1;
    console.log(`✨ ${data.uniqueId} подписался! Всего подписок: ${subCounter}`);

    await sendCommand(`execute ${playerName} ~ ~ ~ summon tnt ~ ~5 ~ {Fuse:40}`);
    await sendCommand(`say ✨ TNT за підписку ${data.uniqueId}!`);
});
