const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();
app.use(helmet({ contentSecurityPolicy: false })); // CSP often needs tuning for app scripts

app.use(
  express.static(path.join(__dirname, 'dist'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-store');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  }),
);

// SPA fallback: serve index.html for non-file routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(process.env.PORT || 8080);
