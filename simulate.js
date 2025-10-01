import { EventEmitter } from "events";
import donations from "./donation.js";
import { Rcon } from "rcon-client";

const playerName = "Cryptowooman";

let likeCounter = 0;
let subCounter = 0; // подписки

// Настройки RCON
const rconConfig = {
    host: "127.0.0.1",
    port: 25575,
    password: "1234"
};

// Отправка команды
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

// Фейковый TikTok (эмиттер событий)
const fakeTikTok = new EventEmitter();

fakeTikTok.on("like", async (data) => {
    likeCounter += data.likeCount; // суммируем лайки
    console.log(`❤️ Лайки от ${data.uniqueId}: +${data.likeCount}, всего: ${likeCounter}`);

    if (likeCounter >= 10000) {
        console.log("🔥 Достигнуто 10k лайков — СПАВНИМ TNT!");
        await sendCommand(`execute ${playerName} ~ ~ ~ summon tnt ~ ~ ~ {Fuse:40}`);
        await sendCommand(`say ❤️ TNT за 10.000 лайків!`);
        likeCounter = 0; // сброс
    }
});

fakeTikTok.on("subscribe", async (data) => {
    subCounter += 1;
    console.log(`✨ ${data.uniqueId} подписался! Всего подписок: ${subCounter}`);

    // Спавн TNT за каждую подписку
    await sendCommand(`execute ${playerName} ~ ~ ~ summon tnt ~ ~ ~ {Fuse:40}`);
    await sendCommand(`say ✨ TNT за підписку ${data.uniqueId}!`);
});

// Обработка "донатов"
fakeTikTok.on("gift", async (data) => {
    console.log(`⚡ Симуляция: ${data.uniqueId} отправил ${data.giftName} x${data.repeatCount}`);

    const rule = donations[data.giftName];
    if (rule) {
        let commands = [];

        if (Array.isArray(rule)) {
            // если это массив команд
            commands = rule;
        } else if (typeof rule === "function") {
            // если это функция, передаем repeatCount
            commands = rule(data.repeatCount);
        }

        for (let cmd of commands) {
            await sendCommand(`execute ${playerName} ~ ~ ~ ${cmd}`);
        }
    } else {
        console.log("Нет правил для подарка:", data.giftName);
    }
});

// Воркает
// fakeTikTok.emit("gift", { uniqueId: "Tester1", giftName: "Rose", repeatCount: 1 });
// fakeTikTok.emit("gift", { uniqueId: "Tester1", giftName: "Rose", repeatCount: 3 });
// fakeTikTok.emit("gift", { uniqueId: "Tester1", giftName: "Heart Me", repeatCount: 1 });
// fakeTikTok.emit("gift", { uniqueId: "Tester1", giftName: "Finger heart", repeatCount: 1 });
// fakeTikTok.emit("gift", { uniqueId: "Tester1", giftName: "Rosa", repeatCount: 1 });
// fakeTikTok.emit("gift", { uniqueId: "Tester1", giftName: "Rosa", repeatCount: 5 });
// fakeTikTok.emit("gift", { uniqueId: "Tester1", giftName: "Doughnut", repeatCount: 1 });
// fakeTikTok.emit("gift", { uniqueId: "Tester1", giftName: "Tsar", repeatCount: 1 });
// fakeTikTok.emit("gift", { uniqueId: "Tester1", giftName: "Sunglasses", repeatCount: 1 });
// fakeTikTok.emit("gift", { uniqueId: "Tester1", giftName: "Dragon Crown", repeatCount: 1 });
// fakeTikTok.emit("like", { uniqueId: "TesterLikes", likeCount: 5000 });
// fakeTikTok.emit("like", { uniqueId: "TesterLikes2", likeCount: 6000 });
// fakeTikTok.emit("subscribe", { uniqueId: "NewSub" });