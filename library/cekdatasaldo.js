const fs = require('fs');
const saldobokep = "./source/src/saldo.json";

// Fungsi Helper untuk menambahkan saldo
function tambahSaldo(user, amount) {
    const saldoPath = './source/src/saldo.json';
    let saldoData = {};

    if (fs.existsSync(saldoPath)) {
        saldoData = JSON.parse(fs.readFileSync(saldoPath));
    }

    saldoData[user] = (saldoData[user] || 0) + parseInt(amount);
    fs.writeFileSync(saldoPath, JSON.stringify(saldoData, null, 2));
}

// Fungsi Helper untuk memeriksa saldo
function cekSaldo(user) {
    const saldoPath = './source/src/saldo.json';
    if (fs.existsSync(saldoPath)) {
        const saldoData = JSON.parse(fs.readFileSync(saldoPath));
        return saldoData[user] || 0;
    }
    return 0;
}
const addSaldo = (userId, amount, _dir) => {
let position = null
Object.keys(_dir).forEach((x) => {
if (_dir[x].id === userId) {
position = x
}
})
if (position !== null) {
_dir[position].saldo += amount
fs.writeFileSync('./source/src/saldo.json', JSON.stringify(_dir, null, 3))
} else {
var object_add = ({
id: userId,
saldo: amount
})
_dir.push(object_add)
fs.writeFileSync('./source/src/saldo.json', JSON.stringify(_dir, null, 3))
}
}
// Fungsi Helper untuk mengurangi saldo
function kurangiSaldo(user, amount) {
    const saldoPath = './source/src/saldo.json';
    if (fs.existsSync(saldoPath)) {
        const saldoData = JSON.parse(fs.readFileSync(saldoPath));
        if (saldoData[user] >= amount) {
            saldoData[user] -= amount;
            fs.writeFileSync(saldoPath, JSON.stringify(saldoData, null, 2));
            return true;
        }
    }
    return false;
}
module.exports = { addSaldo, tambahSaldo, cekSaldo, kurangiSaldo };