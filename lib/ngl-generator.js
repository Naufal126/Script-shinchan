const { createCanvas } = require('canvas');
const fs = require('fs');

function createNGLImage(textRequest) {
  // 1. Buat canvas 800x800 pixel
  const canvas = createCanvas(800, 800);
  const ctx = canvas.getContext('2d');

  // 2. Design background (gradient hitam)
  const gradient = ctx.createLinearGradient(0, 0, 800, 800);
  gradient.addColorStop(0, '#000000');
  gradient.addColorStop(1, '#1a1a1a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 800);

  // 3. Tambahkan teks
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 60px "Arial"';
  ctx.textAlign = 'center';
  ctx.fillText('🔒 ANONYMOUS REQUEST', 400, 350);
  
  ctx.font = '30px "Arial"';
  ctx.fillText(textRequest.substring(0, 30), 400, 450); // Maksimal 30 karakter

  // 4. Simpan ke buffer
  return canvas.toBuffer('image/jpeg');
}

module.exports = createNGLImage;