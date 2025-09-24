import { EventEmitter } from "events";
import donations from "./donation.js";
import { Rcon } from "rcon-client";

const playerName = "Cryptowooman";

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

// Счётчики донатов
const giftCounters = {
    "Rose": 0
};

// Фейковый TikTok (эмиттер событий)
const fakeTikTok = new EventEmitter();

// Обработка "донатов"
fakeTikTok.on("gift", async (data) => {
    console.log(`⚡ Симуляция: ${data.uniqueId} отправил ${data.giftName} x${data.repeatCount}`);

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

    // ✅ Счётчик для Rose
    if (data.giftName === "Rose") {
        giftCounters.Rose += data.repeatCount;
        console.log(`🌹 Всего роз: ${giftCounters.Rose}`);

        if (giftCounters.Rose >= 100) {
            console.log("💥 Достигнут лимит 100 роз — СПАВНИМ ГИГАНТСКИЙ TNT!");
            // await sendCommand(`execute ${playerName} ~ ~ ~ summon Fireball ~ ~10 ~ {ExplosionPower:20,Motion:[0.0,-1.0,0.0]}`); 
            // await sendCommand(`bigboom ${playerName}`);
            await sendCommand(`say 💣 ГИГАНТСКИЙ TNT ЗА 100 РОЗ!`);
            giftCounters.Rose = 0; // сбрасываем счётчик
        }
    }
});

// Пример тестов
fakeTikTok.emit("gift", { uniqueId: "Tester1", giftName: "Rose", repeatCount: 50 });
fakeTikTok.emit("gift", { uniqueId: "Tester2", giftName: "Rose", repeatCount: 60 });
fakeTikTok.emit("gift", { uniqueId: "Tester3", giftName: "TikTok Universe", repeatCount: 1 });
