const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUNaZjZ1SS9HZXZyR3JMV0Q0aml4R2ZtN1loVmUyRGY3REtFY2hHbytYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnFuRUp4ckNIUzQ1K3NxeGRoQVcreGE4YzA4V2dFUmlqYXZnZ0NLdUNYdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTjlpQzFJVmRaV0ZEeHpUc3dUSFRQMS9mVEVXejhGWFB1QXNqSk5ucTBjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoaDVPbng0WWtzRmtzWnlRTDdGK3JVZEdpcXk0c2xZMVhqZzg3eWJQbzFFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdBM0dtNjFEQy9Lek9JdTFPVklBa3RabEdua2xJbEpvREswQnBIT29KM0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVNSG94cnMyZmRSZ1FxSk9ETVVUYUp2M2xtQUhOUWJpS3Z0aE5CanFHQ1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0xuMm1HZG52U1R3a2JiZHIvWmpqWmprTmNtM3lFeFQ2cVlId0NQWmdVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRE5UUmM3R1JKejlMZ1JJTEswQ05hVWVmYWd0V1k5SW83cXY3OU5nNTMxVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJMMmhaTjJtdXRqMGwwaGxJK1dRbzF3OXRIbVVFdDRMbTVxTVZEektyc0phRTkxTndrUWd0Y2k5dnVPanpZWkFRSDJUdUdoM1AyeW5tR3NvVzFKbkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA0LCJhZHZTZWNyZXRLZXkiOiJyamh2eUJuQUUvMzVpTDdsV011aHMzTmE2dGFmenVEQnBDbkQ4bitiZzNNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJVN0RBSWhVVVRPS0ZRYUlEMWdmdkNnIiwicGhvbmVJZCI6ImQxY2QyYzhiLTI5NWItNDgxMi04NDdiLTRmOTYyZmIzYWNkNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQVGRTRlMyS1ZoMHdnMkpvWE1CYU5lcFY2MUE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieEtWVnRUOUQ1UndBa0ZlZnNIdHRZVTZrSHRVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjNBTEFONUhTIiwibWUiOnsiaWQiOiIyNTQ3NzM0NDA3NTg6NjhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0p6LzlJVUNFUFNFL2JJR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ikxtdzk4ZktTaUxsWGlHOG1vNzM4SFJyUjB6TmdLZWxpRll6RlZKMm53bVE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjdVWDI3K0pvMSttamV3K3lMekJVanl5TGFJOE5vV3liYUVKVGhzd1JrMmtNTVhrUEJSQWdoRnM4bkRSN2xvREQvQkdRNmN6UG1wTFk3RWZod0NXc0FRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ4b1h6dEpOczk2QkVBU1M1V0R6QzZ1V1QzZEpnMTl0S0JSNXBUb2FpeFRtOWVIM09LMUIra1RBOVpSV3huUFlTR0lnTldISytwb01xT0Rkd3E2bjlCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc3MzQ0MDc1ODo2OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTNXNQZkh5a29pNVY0aHZKcU85L0IwYTBkTXpZQ25wWWhXTXhWU2RwOEprIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE3NTE4OTc3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUV4RCJ9;;;=>',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Dj Delboy",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "+254 773 440758", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
