const fs = require('fs');

function formatmoney(n, opt = {}) {
  if (!opt.current) opt.current = "IDR"
  return n.toLocaleString("id", { style: "currency", currency: opt.current })
}

function formatmoneyMYR(n, opt = {}) {
  if (!opt.current) opt.current = "MYR"; // Default ke MYR jika opt.current tidak disediakan
  return n.toLocaleString("ms-MY", { style: "currency", currency: opt.current });
}


function formatmoneyy(n, opt = {}) {
  if (!opt.current) opt.current = "IDR";

  // Mengatur opsi style currency
  const options = {
    style: "currency",
    currency: opt.current,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 // Mengubah nilai maximumFractionDigits menjadi 0 agar angka dibulatkan
  };

  // Mengubah angka menjadi format uang
  const rounded = Math.round(n / 100) * 100; // Membulatkan angka menjadi kelipatan 100
  const formatted = rounded.toLocaleString("id", options);

  // Mengembalikan hasil
  return formatted;
}

function generateRandomString(length) {
  var result = 'TSD';

  // Tambahkan tanggal saat ini dalam format yyyymmdd
  var currentDate = new Date();
  var formattedDate =
    currentDate.getFullYear().toString().padStart(4, '0') +
    (currentDate.getMonth() + 1).toString().padStart(2, '0') +
    currentDate.getDate().toString().padStart(2, '0');

  result += formattedDate;

  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;

  // Tambahkan huruf acak
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function generateNumericRefId(length) {
  const min = Math.pow(10, length - 1); // Menentukan angka minimum sesuai panjang
  const max = Math.pow(10, length) - 1; // Menentukan angka maksimum sesuai panjang
  return Math.floor(Math.random() * (max - min + 1)) + min; // Menghasilkan angka acak dalam rentang tersebut
}

module.exports = {
  formatmoney,
  formatmoneyMYR,
  formatmoneyy,
  generateRandomString,
  generateNumericRefId
};