const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const simpleGit = require('simple-git');

const BACKUP_FILE = 'backup.zip';
const TEMP_DIR = './temp-backup';
const GITHUB_REPO = 'https://github.com/TradZz/backup.git';
const GITHUB_BRANCH = 'backup';
const GITHUB_TOKEN = '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';

let isBackingUp = false;

async function createBackupZip() {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(BACKUP_FILE);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => resolve(BACKUP_FILE));
    archive.on('error', err => reject(err));
    archive.pipe(output);

    archive.glob('**/*', {
      ignore: ['node_modules/**', '.cache/**', '.npm/**', 'session/**', TEMP_DIR + '/**', BACKUP_FILE]
    });

    archive.finalize();
  });
}

async function uploadToFolderInRepo() {
  if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true, force: true });

  const git = simpleGit();
  const REPO_URL = GITHUB_REPO.replace('https://', `https://${GITHUB_TOKEN}@`);
  await git.clone(REPO_URL, TEMP_DIR, ['-b', GITHUB_BRANCH]);

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const folderName = `backup-${timestamp}`;
  const folderPath = path.join(TEMP_DIR, folderName);
  fs.mkdirSync(folderPath, { recursive: true });

  fs.copyFileSync(BACKUP_FILE, path.join(folderPath, 'backup.zip'));

  const tempGit = simpleGit(TEMP_DIR);
  await tempGit.addConfig('user.email', 'tradzz.bot@gmail.com');
  await tempGit.addConfig('user.name', 'Tradzz Bot');

  await tempGit.add('./*');
  await tempGit.commit(`Backup pada ${timestamp}`);
  await tempGit.push('origin', GITHUB_BRANCH);

  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  fs.unlinkSync(BACKUP_FILE);

  return `https://github.com/TradZz/backup/tree/${GITHUB_BRANCH}/${folderName}`;
}

async function backupBot() {
  if (isBackingUp) {
    throw new Error('⚠️ Proses backup sedang berlangsung. Tunggu hingga selesai.');
  }

  isBackingUp = true;
  try {
    await createBackupZip();
    const url = await uploadToFolderInRepo();
    return url;
  } finally {
    isBackingUp = false;
    if (fs.existsSync(BACKUP_FILE)) fs.unlinkSync(BACKUP_FILE);
  }
}

module.exports = { backupBot };