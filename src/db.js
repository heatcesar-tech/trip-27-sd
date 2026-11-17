const { Pool } = require('pg');

function shouldUseSsl(databaseUrl) {
  if (process.env.NODE_ENV === 'production') return true;
  if (!databaseUrl) return false;
  try {
    const parsed = new URL(databaseUrl);
    return !['localhost', '127.0.0.1', '::1'].includes(parsed.hostname);
  } catch {
    return false;
  }
}

const connectionString = process.env.DATABASE_URL || '';

const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: shouldUseSsl(connectionString)
        ? { rejectUnauthorized: false }
        : false,
      connectionTimeoutMillis: 8000,
      idleTimeoutMillis: 30000,
      max: 10
    })
  : null;

if (pool) {
  pool.on('error', (err) => {
    console.error('[DB] Unexpected pool error:', err.message);
  });
}

let dbReady = false;
let dbError = connectionString ? null : 'DATABASE_URL no está configurada';

async function initDb() {
  if (!pool) {
    dbReady = false;
    dbError = 'DATABASE_URL no está configurada';
    console.warn('[DB] DATABASE_URL not set. Running without database persistence.');
    return false;
  }

  try {
    await pool.query('SELECT 1');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        author_name VARCHAR(80) NOT NULL,
        target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('general', 'day', 'leg', 'stop')),
        target_id VARCHAR(50),
        target_label VARCHAR(120),
        body TEXT NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_comments_target
      ON comments (target_type, target_id, status, created_at DESC);
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS plan_updates (
        id SERIAL PRIMARY KEY,
        author_name VARCHAR(80) NOT NULL,
        summary VARCHAR(240) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM plan_updates');
    if (rows[0] && rows[0].count === 0) {
      await pool.query(
        `INSERT INTO plan_updates (author_name, summary)
         VALUES ($1, $2)`,
        [
          'Sistema',
          'Versión inicial del Circuito Europa 2027 (30 abr – 15 may) publicada para revisión colaborativa.'
        ]
      );
    }

    dbReady = true;
    dbError = null;
    console.log('[DB] PostgreSQL connected and schema initialized.');
    return true;
  } catch (err) {
    dbReady = false;
    dbError = err.message || 'No se pudo conectar a PostgreSQL';
    console.error('[DB] Initialization failed:', err.message);
    return false;
  }
}

async function checkHealth() {
  if (!pool) {
    return { ok: false, error: 'DATABASE_URL no configurada' };
  }
  await pool.query('SELECT 1');
  dbReady = true;
  dbError = null;
  return { ok: true };
}

function getPool() {
  return pool;
}

function getDbStatus() {
  return { ready: dbReady, error: dbError };
}

module.exports = {
  initDb,
  checkHealth,
  getPool,
  getDbStatus
};
