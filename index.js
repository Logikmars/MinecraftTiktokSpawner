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
const tiktokUsername = "cryptowooman";
const tiktok = new TikTokLiveConnection(tiktokUsername);

// 🔌 Запуск соединения
tiktok.connect()
    .then(() => console.log("✅ Подключено к TikTok Live"))
    .catch(err => console.error("❌ Ошибка подключения:", err));

// 🎁 Обработка подарков
// tiktok.on("gift", async (data) => {
//     const user = data.user?.uniqueId || "Unknown";
//     const gift = data.giftName || data.gift?.giftName || "Unknown";
//     const repeat = data.repeatCount || data.gift?.repeatCount || 1;

//     console.log(`⚡ ${user} отправил ${gift} x${repeat}`);

//     const rule = donations[gift];
//     if (rule) {
//         let commands = [];

//         if (Array.isArray(rule)) {
//             commands = rule;
//         } else if (typeof rule === "function") {
//             commands = rule(repeat);
//         }

//         for (let cmd of commands) {
//             await sendCommand(`execute ${playerName} ~ ~ ~ ${cmd}`);
//         }
//     } else {
//         console.log("Нет правил для подарка:", gift);
//     }
// });

// tiktok.on("gift", (data) => {
//     console.log("=== GIFT EVENT ===");
//     console.dir(data, { depth: null });
// });
tiktok.on("gift", async (data) => {
    if (!data.repeatEnd) return; // только один раз на комбинацию

    const user = data.user?.uniqueId || "Unknown";
    const gift = data.giftDetails?.giftName || "Unknown";
    const repeat = data.repeatEnd || 1;

    console.log(`⚡ ${user} отправил ${gift} x${repeat}`);

    const rule = donations[gift];
    if (rule) {
        let commands = [];

        if (typeof rule === "function") {
            commands = rule(repeat);
        } else if (Array.isArray(rule)) {
            commands = rule;
        }

        for (let cmd of commands) {
            await sendCommand(`execute ${playerName} ~ ~ ~ ${cmd}`);
        }
    } else {
        console.log("Нет правил для подарка:", gift);
    }
});



// ❤️ Обработка лайков
tiktok.on("like", async (data) => {
    likeCounter += data.likeCount;
    console.log(`❤️ Лайки от ${data.user?.uniqueId}: +${data.likeCount}, всего: ${likeCounter}`);

    // ТАСК потом увеличить до 10к
    if (likeCounter >= 100) {
        console.log("🔥 Достигнуто 10k лайков — СПАВНИМ TNT!");
        await sendCommand(`execute ${playerName} ~ ~ ~ summon tnt ~ ~5 ~ {Fuse:40}`);
        await sendCommand(`say ❤️ TNT за 10.000 лайков!`);
        likeCounter = 0;
    }
});

// ✨ Обработка подписок
tiktok.on("subscribe", async (data) => {
    subCounter += 1;
    console.log(`✨ ${data.user?.uniqueId} подписался! Всего подписок: ${subCounter}`);

    await sendCommand(`execute ${playerName} ~ ~ ~ summon tnt ~ ~5 ~ {Fuse:40}`);
    await sendCommand(`say ✨ TNT за підписку ${data.user?.uniqueId}!`);
});
