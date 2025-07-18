const fs = require('fs');

const addMoney = (sender, amount) => {
  const balanceFilePath = './source/src/saldo.json';

  try {
    let money = JSON.parse(fs.readFileSync(balanceFilePath));
    let position = money.findIndex(user => user.id === sender);

    if (position === -1) {
      money.push({ id: sender, role: "Bronze", money: 0 });
      position = money.length - 1;
    }

    if (money[position].money === null) {
      money[position].money = 0;
    }

    money[position].money += amount;

    fs.writeFileSync(balanceFilePath, JSON.stringify(money, null, 3));
    return true;
  } catch (error) {
    console.log(`Error reading/writing balance file: ${error}`);
    return false;
  }
};

const refundMoney = (sender, amount) => {
  addMoney(sender, amount);
};

const moneyAdd = (sender, amount) => {
  const balanceFilePath = './source/src/saldo.json';

  try {
    let money = JSON.parse(fs.readFileSync(balanceFilePath));
    let position = money.findIndex(user => user.id === sender);

    if (position !== -1) {
      // Inisialisasi money ke 0 jika null
      if (money[position].money === null) {
        money[position].money = 0;
      }

      const newBalance = money[position].money - amount;

      // Jika pengurangan saldo tidak diinginkan, beri peringatan
      if (newBalance < 0) {
        console.warn(`Saldo pengguna ${sender} akan menjadi negatif.`);
      }

      money[position].money -= amount;

      // Tulis kembali data
      fs.writeFileSync(balanceFilePath, JSON.stringify(money, null, 3));
    }
  } catch (error) {
    console.log(`Error reading/writing balance file: ${error}`);
  }
};

const subtractMoney = (sender, amount) => {
  const balanceFilePath = './source/src/saldo.json';

  try {
    let money = JSON.parse(fs.readFileSync(balanceFilePath));
    let position = money.findIndex(user => user.id === sender);

    if (position !== -1) {
      if (money[position].money === null) {
        money[position].money = 0;
      }

      const newBalance = money[position].money - amount;

      if (newBalance < 0) {
        console.warn(`Saldo pengguna ${sender} akan menjadi negatif.`);
      }

      money[position].money -= amount;

      fs.writeFileSync(balanceFilePath, JSON.stringify(money, null, 3));
      return true;
    } else {
      console.log(`Pengguna ${sender} tidak ditemukan.`);
      return false;
    }
  } catch (error) {
    console.log(`Error reading/writing balance file: ${error}`);
    return false;
  }
};

const resetMoney = (sender) => {
  const balanceFilePath = './source/src/saldo.json';

  try {
    let money = JSON.parse(fs.readFileSync(balanceFilePath));
    let position = money.findIndex(user => user.id === sender);

    if (position !== -1) {
      money[position].money = 0;

      fs.writeFileSync(balanceFilePath, JSON.stringify(money, null, 3));
      return true;
    } else {
      console.log(`Pengguna ${sender} tidak ditemukan.`);
      return false;
    }
  } catch (error) {
    console.log(`Error reading/writing balance file: ${error}`);
    return false;
  }
};

const getMonUser = (sender) => {
  const balanceFilePath = './source/src/saldo.json';

  try {
    const money = JSON.parse(fs.readFileSync(balanceFilePath));
    const user = money.find(obj => obj.id === sender);

    return user ? (user.money === null ? 0 : user.money) : 0;
  } catch (error) {
    console.log(`Error reading balance file: ${error}`);
    return 0;
  }
};

const getRoleUser = (sender) => {
  const balanceFilePath = './source/src/saldo.json';

  try {
    let money = JSON.parse(fs.readFileSync(balanceFilePath));
    let user = money.find((obj) => obj.id === sender);

    if (!user) {
      user = { id: sender, role: "Bronze", money: 0 };
      money.push(user);
      fs.writeFileSync(balanceFilePath, JSON.stringify(money, null, 3));
    } else {
      if (!user.role) {
        user.role = "Bronze";
      }
      if (user.money === null) {
        user.money = 0;
      }
      fs.writeFileSync(balanceFilePath, JSON.stringify(money, null, 3));
    }

    return user.role;
  } catch (error) {
    console.log(`Error reading/writing balance file: ${error}`);
    return "Bronze";
  }
};

function catatRiwayatTransaksi(userNumber, productName, transactionTime, price, keuntungan, status, invoiceNumber) {
  const fs = require('fs');
  const riwayatPath = './source/src/riwayatTransaksiUser.json';

  const bulanTeks = new Date().toLocaleString('id-ID', { month: 'long' });
  const tahunNumerik = new Date().getFullYear();

  let riwayatTransaksi = [];
  try {
    const data = fs.readFileSync(riwayatPath);
    riwayatTransaksi = JSON.parse(data);
  } catch (err) {
    console.error('Error reading or parsing riwayatTransaksiUser.json:', err);
  }

  const transaksiBaru = {
    userNumber,
    productName,
    transactionTime,
    price,
    keuntungan,
    status,
    invoiceNumber,
    month: bulanTeks,
    year: tahunNumerik,
  };

  riwayatTransaksi.push(transaksiBaru);

  try {
    fs.writeFileSync(riwayatPath, JSON.stringify(riwayatTransaksi, null, 3));
    console.log('Riwayat transaksi berhasil ditambahkan.');
  } catch (err) {
    console.error('Error writing riwayatTransaksiUser.json:', err);
  }
}

module.exports = {
  addMoney,
  refundMoney,
  moneyAdd,
  subtractMoney,
  resetMoney,
  getMonUser,
  getRoleUser,
  catatRiwayatTransaksi,
};