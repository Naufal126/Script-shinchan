console.clear();
console.log('Starting.....');
require('./config');
const { modul } = require('./module');
require("./system/global")
const func = require("./system/place")
process.on("uncaughtException", console.error);

const {
    default: makeWASocket,
    makeCacheableSignalKeyStore,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    makeInMemoryStore,
    getContentType,
    jidDecode,
    MessageRetryMap,
    getAggregateVotesInPollMessage,
    proto,
    delay
} = require("baileys")

const cfonts = require('cfonts');
const pino = require('pino');
const readline = require("readline");
const fs = require('fs');
const moment = require('moment-timezone');
const welcomeDB = './database/welcome.json';
const chalk = require('chalk')
const _ = require('lodash')
const util = require('util')
const path = require('path')
const fetch = require('node-fetch')
const FileType = require('file-type');
const { Boom } = require('@hapi/boom');
const NodeCache = require("node-cache");
const figlet = require("figlet")
const PhoneNumber = require('awesome-phonenumber');
const syntax = require("syntax-error")
const msgRetryCounterCache = new NodeCache()
const retryCache = new NodeCache({ stdTTL: 30, checkperiod: 20 })
const sendCache = new NodeCache({ stdTTL: 30, checkperiod: 20 })
const { color } = require('./lib/color');
const {
    smsg,
    sendGmail,
    formatSize,
    isUrl,
    generateMessageTag,
    getBuffer,
    getSizeMedia,
    runtime,
    fetchJson,
    sleep
} = require('./lib/myfunc');

const {
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid
} = require('./lib/exif')

const usePairingCode = true;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}
const DataBase = require('./system/database.js');
const database = new DataBase();
(async () => {
const loadData = await database.read()
if (loadData && Object.keys(loadData).length === 0) {
global.db = {
users: {},
groups: {},
database: {},
settings : {}, 
...(loadData || {}),
}
await database.write(global.db)
} else {
global.db = loadData
}
setInterval(async () => {
if (global.db) await database.write(global.db)
}, 5000)
})()

async function startSesi() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)

global.db = JSON.parse(fs.readFileSync("./database/database.json"));
    global.db.data = {
    sticker: {},
    database: {},
    game: {},
    others: {},
    users: {},
    chats: {},
    rpg: {},
    settings: {},
    anonymous: {},
    ...(global.db.data || {}),
};

            const connectionOptions = {
version: (await (await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json')).json()).version,
browser: ["Ubuntu", "Chrome", "20.0.04"],
getMessage: async (key) => {
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
return msg?.message || undefined
}
return {
conversation: 'hallo'
}}, 
printQRInTerminal: !usePairingCode,
logger: pino({ level: "silent" }),
auth: state
}

    const Zeroo = await func.makeWASocket(connectionOptions)
    Zeroo.sendButtonImage = async function(jid, title, text, buffer, buttons, quoted) {
    return this.sendMessage(jid, {
        image: buffer,
        caption: `${title}\n\n${text}`,
        buttons: buttons,
        footer: 'Footer',
        headerType: 4
    }, { quoted });
}
    Zeroo.newsletterFollow = async function(channelId) {
    try {
        console.log(`Berhasil follow channel ${channelId}`);
    } catch (err) {
        console.error(`Gagal follow channel ${channelId}:`, err.message);
    }
};
if (!Zeroo.authState.creds.registered) {

    (async () => {
  const waktu = moment().format('D/M/YYYY, HH.mm.ss');
  const platform = `${os.platform()} (${os.arch()})`;
  const memori = `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`;
  const nodeVersion = process.version;
  const mode = 'PUBLIC';
  const perangkat = '(android)';

  // Log koneksi sistem (tiru gaya gambar)
  console.log(chalk.cyan(`
╭────────────[ INFO SERVER ]────────────╮
│ Waktu     : ${waktu}
│ Platform  : ${platform}
│ Memori    : ${memori}
│ NodeJS    : ${nodeVersion}
│ Mode      : ${mode}
│ Perangkat : ${perangkat}
╰────────────────────────────────────────╯`));
const phoneNumber = await question(chalk.cyan.bold(`
Terima Kasih Atas Semua Support Dari Kalian

Welcome To Jinshi Multi Device 
   > Enter Your Number <
───────────────────────────────

Masukan nomer bot : `));
  console.log(chalk.yellow(`Nomor bot : ${phoneNumber}`));
  
  const code = await Zeroo.requestPairingCode(phoneNumber.trim())
await console.log(`╭────────────[ PAIRING ]────────────╮\n│${chalk.blue.bold('Pairing Code')} : ${chalk.white.bold(code)}\n╰────────────────────────────────────────╯`)
  rl.close();
})();
    }

    store.bind(Zeroo.ev);

    Zeroo.ev.on('messages.upsert', async chatUpdate => {
    try {
        // ========== FITUR AUTOREAD STORY ==========
        if (global.autoreadStory) {
            for (let msg of chatUpdate.messages) {
                if (!msg.key || !msg.key.remoteJid) continue;

                const from = msg.key.remoteJid;

                // Deteksi status WhatsApp
                if (from.startsWith('status@broadcast')) {
                    try {
                        await Zeroo.readMessages([
                            {
                                remoteJid: from,
                                id: msg.key.id,
                                participant: msg.key.participant || ''
                            }
                        ]);
                        console.log('[AUTOREAD STORY] Story dibaca dari', msg.key.participant);
                    } catch (e) {
                        console.error('[ERROR] Auto-read story:', e);
                    }
                }
            }
        }
        // ============================================

        let mek = chatUpdate.messages[0]
        if (!mek.message) return
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return
        if (!Zeroo.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
        let m = smsg(Zeroo, mek, store)
        require("./Zero")(Zeroo, m, chatUpdate, mek, store)
    } catch (err) {
        console.log(chalk.yellow.bold("[ ERROR ] Zero.js :\n") + chalk.redBright(util.format(err)))
    }
});


    Zeroo.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    Zeroo.ev.on("connection.update", async (update) => {
        const {
            connection,
            lastDisconnect
        } = update;
        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.badSession) {
                console.log(`Bad Session File, Please Delete Session and Scan Again`);
                process.exit()
            } else if (reason === DisconnectReason.badSession) {
                console.warn(`Bad Session File, Please Delete Session and Scan Again`)
                process.exit()
            } else if (reason === DisconnectReason.connectionClosed) {
                console.warn('Connection closed, reconnecting...')
                process.exit()
            } else if (reason === DisconnectReason.connectionLost) {
                console.warn('Connection lost, trying to reconnect')
                process.exit()
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.warn('Connection Replaced, Another New Session Opened, Please Close Current Session First')
                Zeroo.logout()
            } else if (reason === DisconnectReason.loggedOut) {
                console.warn(`Device Logged Out, Please Scan Again And Run.`)
                Zeroo.logout()
            } else if (reason === DisconnectReason.restartRequired) {
                console.log('Restart Required...');
                startSesi()
            } else if (reason === DisconnectReason.timedOut) {
                console.log('Connection TimedOut, Reconnecting...')
                startSesi()
            }
        } else if (connection === "open") {
const SETTINGS_PATH = './database/autosholat.json';

function loadSettings() {
    try {
        const data = fs.readFileSync(SETTINGS_PATH);
        return JSON.parse(data);
    } catch (e) {
        return { autosholat: true }; // default config
    }
}

function saveSettings() {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(global.settings, null, 2));
}

global.settings = loadSettings();
    global.autosholat = global.autosholat || {};
    global.settings = global.settings || {};
    global.settings.autosholat = global.settings.autosholat ?? true;

    // Follow newsletter otomatis
    Zeroo.newsletterFollow('120363323868732166@newsletter')

    console.log(chalk.green('[✔] Sistem Terhubung\n[+] WhatsApp Bot Terhubung\n[+] Database Terhubung\n[+] Keamanan Terhubung!\n\nComplete'));

    setInterval(async () => {
        if (!global.settings.autosholat) return;

        const timeNow = moment().tz("Asia/Jakarta").format("HH:mm");

        const jadwalSholat = {
            Subuh: "04:29",
            Dhuhr: "11:35",
            Ashar: "15:10",
            Maghrib: "17:45",
            Isha: "18:50"
        };

        for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
            if (timeNow === waktu && !global.autosholat[sholat]) {
                console.log(`Waktu Sholat ${sholat} - Mengirim adzan ke semua grup`);

                const thumb = "https://files.catbox.moe/da5cwl.jpeg";

                try {
                    const groups = await Zeroo.groupFetchAllParticipating();
                    for (let jid in groups) {
                        await Zeroo.sendMessage(jid, {
                            audio: { url: 'https://media.vocaroo.com/mp3/1ofLT2YUJAjQ' },
                            mimetype: 'audio/mp4',
                            ptt: true,
                            contextInfo: {
                                externalAdReply: {
                                    showAdAttribution: true,
                                    mediaType: 1,
                                    title: `Selamat menunaikan Ibadah Sholat ${sholat} untuk semarang dan sekitarnya`,
                                    body: `🕑 ${waktu} WIB`,
                                    sourceUrl: global.my.ch || '',
                                    thumbnailUrl: thumb,
                                    renderLargerThumbnail: true
                                }
                            }
                        });
                    }

                    global.autosholat[sholat] = true;
                    setTimeout(() => delete global.autosholat[sholat], 60000);
                } catch (e) {
                    console.error("Gagal kirim adzan otomatis:", e);
                }
            }
        }
    }, 60000);
}})

    Zeroo.sendTextWithMentions = async (jid, text, quoted, options = {}) =>
        Zeroo.sendMessage(jid, {
            text: text,
            contextInfo: {
                mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(
                    (v) => v[1] + "@s.whatsapp.net",
                ),
            },
            ...options,
        },
            { quoted },
        );

    Zeroo.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path)
            ? path
            : /^data:.*?\/.*?;base64,/i.test(path)
                ? Buffer.from(path.split`, `[1], 'base64')
                : /^https?:\/\//.test(path)
                    ? await (await getBuffer(path))
                    : fs.existsSync(path)
                        ? fs.readFileSync(path)
                        : Buffer.alloc(0);

        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options);
        } else {
            buffer = await imageToWebp(buff);
        }

        await Zeroo.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
        return buffer;
    };

    Zeroo.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path)
            ? path
            : /^data:.*?\/.*?;base64,/i.test(path)
                ? Buffer.from(path.split`, `[1], 'base64')
                : /^https?:\/\//.test(path)
                    ? await (await getBuffer(path))
                    : fs.existsSync(path)
                        ? fs.readFileSync(path)
                        : Buffer.alloc(0);

        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options);
        } else {
            buffer = await videoToWebp(buff);
        }

        await Zeroo.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
        return buffer;
    };

    Zeroo.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || "";
        let messageType = message.mtype
            ? message.mtype.replace(/Message/gi, "")
            : mime.split("/")[0];

        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        let type = await FileType.fromBuffer(buffer);
        let trueFileName = attachExtension ? filename + "." + type.ext : filename;
        await fs.writeFileSync(trueFileName, buffer);

        return trueFileName;
    };

    Zeroo.getName = (jid, withoutContact = false) => {
        let id = Zeroo.decodeJid(jid);
        withoutContact = Zeroo.withoutContact || withoutContact;
        let v;
        if (id.endsWith("@g.us"))
            return new Promise(async (resolve) => {
                v = store.contacts[id] || {};
                if (!(v.name || v.subject)) v = Zeroo.groupMetadata(id) || {};
                resolve(
                    v.name ||
                    v.subject ||
                    PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
                        "international",
                    ),
                );
            });
        else
            v =
                id === "0@s.whatsapp.net"
                    ? {
                        id,
                        name: "WhatsApp",
                    }
                    : id === Zeroo.decodeJid(Zeroo.user.id)
                        ? Zeroo.user
                        : store.contacts[id] || {};
        return (
            (withoutContact ? "" : v.name) ||
            v.subject ||
            v.verifiedName ||
            PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
                "international",
            )
        );
    };

    Zeroo.sendContact = async (jid, kon, quoted = '', opts = {}) => {
        let list = []
        for (let i of kon) {
            list.push({
                displayName: await Zeroo.getName(i),
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Zeroo.getName(i)}\nFN:${await Zeroo.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:jangan spam bang\nitem2.EMAIL;type=INTERNET:Rizz Engine\nitem2.X-ABLabel:YouTube\nitem3.URL:rizzengine\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
            })
        }
        Zeroo.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
    }

    Zeroo.serializeM = (m) => smsg(Zeroo, m, store);

    Zeroo.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype;
        if (options.readViewOnce) {
            message.message = message.message?.ephemeralMessage?.message || message.message;
            vtype = Object.keys(message.message.viewOnceMessage.message)[0];
            delete message.message.viewOnceMessage.message[vtype].viewOnce;
            message.message = { ...message.message.viewOnceMessage.message };
        }

        let mtype = Object.keys(message.message)[0];
        let content = await generateForwardMessageContent(message, forceForward);
        let ctype = Object.keys(content)[0];
        let context = {};

        if (mtype != "conversation") {
            context = message.message[mtype].contextInfo;
        }

        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo,
        };

        const waMessage = await generateWAMessageFromContent(
            jid,
            content,
            options
                ? {
                    ...content[ctype],
                    ...options,
                    ...(options.contextInfo
                        ? {
                            contextInfo: {
                                ...content[ctype].contextInfo,
                                ...options.contextInfo,
                            },
                        }
                        : {}),
                }
                : {}
        );

        await Zeroo.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id });
        return waMessage;
    };


    function getTypeMessage(message) {
        const type = Object.keys(message)
        var restype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(type[0]) && type[0]) ||
            (type.length >= 3 && type[1] !== 'messageContextInfo' && type[1]) ||
            type[type.length - 1] || Object.keys(message)[0]
        return restype
    }

    const uploadFile = {
        upload: Zeroo.waUploadToServer
    };
    Zeroo.prefa = 'hah?'
    Zeroo.public = global.status;
    Zeroo.serializeM = (m) => smsg(Zeroo, m, store)
   
Zeroo.ev.on('group-participants.update', async (anu) => {
    try {
        const welcome = JSON.parse(fs.readFileSync(welcomeDB));
        const metadata = await Zeroo.groupMetadata(anu.id);
        const groupId = anu.id;
        const customWelcomeImage = 'https://files.catbox.moe/ko1up5.jpg';
        const customLeaveImage = 'https://files.catbox.moe/ko1up5.jpg';
        const groupName = metadata.subject;
        const participants = anu.participants;

        if (!welcome[groupId] || !welcome[groupId].status) return;

        for (let num of participants) {
            let ppuser;
            try {
                ppuser = await Zeroo.profilePictureUrl(num, 'image');
            } catch {
                ppuser = 'https://telegra.ph/file/de7c8230aff02d7bd1a93.jpg';
            }

            const pushName = await Zeroo.getName(num);
            const time = moment().tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm');

            const tag = [num];
            const teksJoin = welcome[groupId].join || `Selamat datang @user di @group`;
            const teksLeave = welcome[groupId].leave || `Selamat tinggal @user dari @group`;

            let teks;
            if (anu.action === 'add') {
                teks = teksJoin
                    .replace(/@user/g, `@${num.split("@")[0]}`)
                    .replace(/@group/g, groupName)
                    .replace(/@tanggal/g, time);
            }
            if (anu.action === 'remove') {
                teks = teksLeave
                    .replace(/@user/g, `@${num.split("@")[0]}`)
                    .replace(/@group/g, groupName)
                    .replace(/@tanggal/g, time);
            }

            if (teks) {
                await Zeroo.sendMessage(groupId, {
                    text: teks,
                    contextInfo: {
                        mentionedJid: tag,
                        externalAdReply: {
                            title: anu.action === 'add' ? 'W E L C O M E' : 'L E F T',
                            body: anu.action === 'add' ? 'Selamat Datang' : 'Selamat Tinggal',
                            thumbnailUrl: 'https://files.catbox.moe/ko1up5.jpg',
                            sourceUrl: global.linkch || '',
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                });
            }
        }
    } catch (err) {
        console.log('Error di welcome handler:', err);
    }
});

Zeroo.ev.on('call', async (user) => {
if (!global.anticall) return
let botNumber = await Zeroo.decodeJid(Zeroo.user.id)
for (let ff of user) {
if (ff.isGroup == false) {
if (ff.status == "offer") {
let sendcall = await Zeroo.sendMessage(ff.from, {text: `@${ff.from.split("@")[0]} Maaf Kamu Akan Saya Block Karna Ownerbot Menyalakan Fitur *Anticall*\nJika Tidak Sengaja Segera Hubungi Owner Untuk Membuka Blokiran Ini`, contextInfo: {mentionedJid: [ff.from], externalAdReply: {thumbnailUrl: "https://files.catbox.moe/yng1lr.jpg", title: "｢ CALL DETECTED ｣", previewType: "PHOTO"}}}, {quoted: null})
Zeroo.sendContact(ff.from, [owner], "SPAM + VC = BLOK!!!", sendcall)
await sleep(8000)
await Zeroo.updateBlockStatus(ff.from, "block")
}}
}})

    Zeroo.sendButtonImg = async (jid, buttons = [], text, image, footer, quoted = '', options = {}) => {
        const buttonMessage = {
            image: { url: image },
            caption: text,
            footer: footer,
            buttons: buttons.map(button => ({
                buttonId: button.id || '',
                buttonText: { displayText: button.text || 'Button' },
                type: button.type || 1
            })),
            headerType: 1,
            viewOnce: options.viewOnce || false,
        }

        Zeroo.sendMessage(jid, buttonMessage, { quoted })
    }

    Zeroo.sendList = async (jid, title, footer, btn, quoted = '', options = {}) => {
        let msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        ...options,
                        body: proto.Message.InteractiveMessage.Body.create({ text: title }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: footer || "puqi" }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [
                                {
                                    "name": "single_select",
                                    "buttonParamsJson": JSON.stringify(btn)
                                },
                            ]
                        })
                    })
                }
            }
        }, { quoted })
        return await Zeroo.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        })
    }


    Zeroo.sendListImg = async (jid, title, footer, jembot, btn, quoted = '', options = {}) => {
        const media = await prepareWAMessageMedia({ image: { url: jembot } }, { upload: Zeroo.waUploadToServer });
        let msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        ...options,
                        body: proto.Message.InteractiveMessage.Body.create({ text: title }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: footer || "puqi" }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: true,
                            ...media,
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [
                                {
                                    "name": "single_select",
                                    "buttonParamsJson": JSON.stringify(btn)
                                },
                            ]
                        })
                    })
                }
            }
        }, { quoted })
        return await Zeroo.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        })
    }

    Zeroo.sendButtonProto = async (jid, title, footer, buttons = [], quoted = '', options = {}) => {
        let msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        ...options,
                        body: proto.Message.InteractiveMessage.Body.create({ text: title }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: footer || "puqi" }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: buttons
                        })
                    })
                }
            }
        }, { quoted })
        return await Zeroo.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        })
    }


    Zeroo.ments = (teks = '') => {
        return teks.match('@') ? [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') : []
    };

    Zeroo.cMod = (jid, copy, text = '', sender = Zeroo.user.id, options = {}) => {
        let mtype = Object.keys(copy.message)[0];
        let isEphemeral = mtype === 'ephemeralMessage';
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message;
        let content = msg[mtype];
        if (typeof content === 'string') msg[mtype] = text || content;
        else if (content.caption) content.caption = text || content.caption;
        else if (content.text) content.text = text || content.text;
        if (typeof content !== 'string') msg[mtype] = {
            ...content,
            ...options
        };
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid;
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid;
        copy.key.remoteJid = jid;
        copy.key.fromMe = sender === Zeroo.user.id;
        return proto.WebMessageInfo.fromObject(copy);
    }

    Zeroo.sendText = (jid, text, quoted = '', options) => Zeroo.sendMessage(jid, { text: text, ...options }, { quoted });

    Zeroo.deleteMessage = async (chatId, key) => {
        try {
            await Zeroo.sendMessage(chatId, { delete: key });
            console.log(`Pesan dihapus: ${key.id}`);
        } catch (error) {
            console.error('Gagal menghapus pesan:', error);
        }
    };

    Zeroo.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }

    Zeroo.ev.on('creds.update', saveCreds);
    Zeroo.serializeM = (m) => smsg(Zeroo, m, store);
    return Zeroo;
}

startSesi()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
