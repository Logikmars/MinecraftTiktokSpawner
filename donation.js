// Конфиг: название подарка → команды Minecraft
export default {
    "Rose": (count = 1) => {
        const totalTNT = (Math.floor(Math.random() * 1) + 1) * count;
        return Array(totalTNT).fill(`summon tnt ~ ~ ~ {Fuse:80}`);
    },
    // "Rose": () => [`summon tnt ~ ~ ~ {Fuse:80}`],
    "Heart Me": (count = 1) => {
        const totalTNT = 1 * count;
        return Array(totalTNT).fill(`summon tnt ~ ~ ~ {Fuse:80}`);
    },
    "Finger Heart": (count = 1) => {
        const totalTNT = 3 * count;
        return Array(totalTNT).fill(`summon tnt ~ ~ ~ {Fuse:80}`);
    },
    "Rosa": (count = 1) => {
        const totalTNT = (Math.floor(Math.random() * 11) + 10) * count; // 10–20 TNT * repeat
        return Array(totalTNT).fill(`summon tnt ~ ~ ~ {Fuse:80}`);
    },
    "Doughnut": (count = 1) => {
        const totalTNT = 35 * count;
        return Array(totalTNT).fill(`summon tnt ~ ~ ~ {Fuse:80}`);
    },
    "Tsar": (count = 1) => {
        return Array(count).fill(`bigboom @p`);
    },
    "Sunglasses": (count = 1) => {
        return Array(3 * count).fill(`bigboom @p`);
    },
    "Dragon Crown": (count = 1) => {
        const totalTNT = (Math.floor(Math.random() * 6) + 5) * count; // 5–10 BigBoom * repeat
        return Array(totalTNT).fill(`bigboom @p`);
    }
};
