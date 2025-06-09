const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const port = 3000;

const certDir = path.join(os.homedir(), '.office-addin-dev-certs');
const keyPath = path.join(certDir, 'localhost.key');
const certPath = path.join(certDir, 'localhost.crt');

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.log('Certificates not found. Generating new ones...');
  try {
    execSync('npx office-addin-dev-certs install', { stdio: 'inherit' });
  } catch (err) {
    console.error('Failed to generate certificates:', err);
    process.exit(1);
  }
}

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

const server = https.createServer(options, (req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './taskpane.html';
  }
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png'
  };
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});
