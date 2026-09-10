const { spawn } = require('child_process');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const backendDir = path.join(rootDir, 'tx-fibernet', 'backend');
const frontendDir = path.join(rootDir, 'tx-fibernet', 'frontend');

console.log('🚀 Starting TX Fibernet Full-Stack Application...');

// Launch Backend
const backend = spawn('node', ['server.js'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true
});

// Launch Frontend
const frontend = spawn('npx', ['vite', '--port', '5173'], {
  cwd: frontendDir,
  stdio: 'inherit',
  shell: true
});

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});
