// Конфиг: название подарка (giftName в TikTok) → команды Minecraft
export default {
    "Rose": [
        'setblock ~ ~10 ~ minecraft:diamond_block'
        // `summon tnt ~ ~ ~ {Fuse:80}`
        // Fuse - задержка(20тиков = 1с, 80тиков = 4с)
    ],
    // "Ice Cream": [
    //     `summon zombie ~ ~ ~ {CustomName:"\\"Donator_Zombie\\""}`
    // ],
    "Ice Cream" : Array(100).fill(`summon tnt ~ ~10 ~ {Fuse:100}`),
    "TikTok Universe": [
        // `summon wither ~ ~ ~`,
        `say ⚡ ОГО! Супер-донат — появляется Визер!`
    ],
    "Perfume": [
        `summon pig ~ ~ ~ {CustomName:"\\"Donator_Pig\\""}`
    ]
};
