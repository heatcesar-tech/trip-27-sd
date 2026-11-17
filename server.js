require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { initDb } = require('./src/db');
const apiRouter = require('./src/routes/api');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.disable('x-powered-by');

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(cors());
app.use(express.json({ limit: '32kb' }));

// Handle malformed JSON payloads cleanly
app.use((err, _req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido en el cuerpo de la petición.' });
  }
  return next(err);
});

app.use('/api', apiRouter);

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Ruta de API no encontrada.' });
});

const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Global error handler without exposing stack traces
app.use((err, _req, res, _next) => {
  console.error('[SERVER] Unhandled error:', err && err.message ? err.message : err);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

async function start() {
  await initDb();
  app.listen(PORT, () => {
    console.log(`[SERVER] Viaje Europa 2027 escuchando en http://localhost:${PORT}`);
  });
}

start();
