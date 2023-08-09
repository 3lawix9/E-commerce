const express = require('express');
const next = require('next');
const cors = require('cors'); // Import the cors package

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const allowedOrigins = ['https://e-commerce-30wli52p5-3lawix9.vercel.app'];

app.prepare().then(() => {
  const server = express();

  // Use CORS middleware
  server.use(cors({
    origin: allowedOrigins,
  }));

  // Handle all Next.js requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
