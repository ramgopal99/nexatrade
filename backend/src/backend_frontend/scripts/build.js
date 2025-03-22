const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Build Next.js project
execSync('npm run build', { stdio: 'inherit' });

// Copy the output to the canister directory
const outDir = path.join(__dirname, '..', 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

// Copy .next/static to out/static
const staticDir = path.join(__dirname, '..', '.next', 'static');
const outStaticDir = path.join(outDir, '_next', 'static');
if (fs.existsSync(staticDir)) {
  fs.cpSync(staticDir, outStaticDir, { recursive: true });
}

// Create index.html that loads the Next.js app
const indexHtml = `
<!DOCTYPE html>
<html>
  <head>
    <title>NexaTrade</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="/_next/static/css/app.css" />
  </head>
  <body>
    <div id="root"></div>
    <script src="/_next/static/chunks/main.js"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);