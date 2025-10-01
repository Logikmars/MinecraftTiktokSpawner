// Конфиг: название подарка (giftName в TikTok) → команды Minecraft
export default {
    "Rose": (count = 1) => {
        let totalTNT = count === 3 
            ? Math.floor(Math.random() * (10 - 7 + 1)) + 2
            : Math.floor(Math.random() * (10 - 7 + 1)) + 0;
        return Array(totalTNT).fill(`summon tnt ~ ~ ~ {Fuse:80}`);
    },
    "Heart Me":[
        `summon tnt ~ ~ ~ {Fuse:80}`
    ],
    "Finger heart":() =>{
        return Array(3).fill(`summon tnt ~ ~ ~ {Fuse:80}`);
    },
    "Rosa": (count = 1) => {
        let totalTNT = count === 5 
            ? Math.floor(Math.random() * (70 - 40 + 1)) + 40
            : Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        return Array(totalTNT).fill(`summon tnt ~ ~ ~ {Fuse:80}`);
    },
    "Doughnut": () => {
        return Array(35).fill(`summon tnt ~ ~ ~ {Fuse:80}`);
    },
    "Tsar": () => {
        return [`bigboom @p`];
    },
    "Sunglasses": () => {
        // Три BigBoom подряд
        return Array(3).fill(`bigboom @p`);
    },
    "Dragon Crown": () => {
        const count = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
        return Array(count).fill(`bigboom @p`);
    }
};
