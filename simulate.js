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

// Фейковый TikTok (эмиттер событий)
const fakeTikTok = new EventEmitter();

// Обработка "донатов"
fakeTikTok.on("gift", async (data) => {
    console.log(`⚡ Симуляция: ${data.uniqueId} отправил ${data.giftName} x${data.repeatCount}`);

    const commands = donations[data.giftName];
    if (commands) {
        for (let cmd of commands) {
            await sendCommand(`execute ${playerName} ~ ~ ~ ${cmd}`);
        }
    } else {
        console.log("Нет правил для подарка:", data.giftName);
    }
});

// Пример тестов
fakeTikTok.emit("gift", { uniqueId: "Tester1", giftName: "Rose", repeatCount: 1 });
fakeTikTok.emit("gift", { uniqueId: "Tester2", giftName: "Ice Cream", repeatCount: 3 });
fakeTikTok.emit("gift", { uniqueId: "Tester3", giftName: "TikTok Universe", repeatCount: 1 });
