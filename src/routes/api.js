const express = require('express');
const { checkHealth, getPool } = require('../db');

const router = express.Router();

const VALID_TARGET_TYPES = new Set(['general', 'day', 'leg', 'stop']);
const VALID_STATUSES = new Set(['open', 'resolved']);

/**
 * Strips control characters and HTML tags so only safe plain text is stored.
 */
function sanitizePlainText(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

function parsePositiveInt(raw) {
  const num = Number(raw);
  if (!Number.isInteger(num) || num <= 0) return null;
  return num;
}

function requirePool(res) {
  const pool = getPool();
  if (!pool) {
    res.status(503).json({
      error: 'La base de datos no está configurada o disponible en este momento.'
    });
    return null;
  }
  return pool;
}

// GET /api/health
router.get('/health', async (_req, res) => {
  try {
    const result = await checkHealth();
    if (!result.ok) {
      return res.status(503).json({ ok: false, error: 'Base de datos no disponible' });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error('[API] Healthcheck error:', err.message);
    return res.status(503).json({ ok: false, error: 'Base de datos no disponible' });
  }
});

// GET /api/comments
router.get('/comments', async (req, res, next) => {
  const pool = requirePool(res);
  if (!pool) return;

  try {
    const { target_type, target_id, status } = req.query;
    const conditions = [];
    const params = [];

    if (target_type !== undefined && target_type !== '') {
      if (!VALID_TARGET_TYPES.has(String(target_type))) {
        return res.status(400).json({ error: 'target_type inválido' });
      }
      params.push(String(target_type));
      conditions.push(`target_type = $${params.length}`);
    }

    if (target_id !== undefined && target_id !== '') {
      params.push(String(target_id).slice(0, 50));
      conditions.push(`target_id = $${params.length}`);
    }

    if (status !== undefined && status !== '') {
      if (!VALID_STATUSES.has(String(status))) {
        return res.status(400).json({ error: 'status inválido' });
      }
      params.push(String(status));
      conditions.push(`status = $${params.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const sql = `
      SELECT id, author_name, target_type, target_id, target_label, body, status, created_at
      FROM comments
      ${whereClause}
      ORDER BY created_at DESC, id DESC
      LIMIT 500
    `;

    const { rows } = await pool.query(sql, params);
    return res.json({ comments: rows });
  } catch (err) {
    return next(err);
  }
});

// POST /api/comments
router.post('/comments', async (req, res, next) => {
  const pool = requirePool(res);
  if (!pool) return;

  try {
    const authorName = sanitizePlainText(req.body?.author_name);
    const targetType = typeof req.body?.target_type === 'string' ? req.body.target_type.trim() : '';
    const rawTargetId = req.body?.target_id;
    const rawTargetLabel = req.body?.target_label;
    const body = sanitizePlainText(req.body?.body);

    if (!authorName || authorName.length > 80) {
      return res.status(400).json({
        error: 'El nombre del autor es obligatorio y debe tener máximo 80 caracteres.'
      });
    }

    if (!VALID_TARGET_TYPES.has(targetType)) {
      return res.status(400).json({
        error: 'target_type debe ser general, day, leg o stop.'
      });
    }

    if (!body || body.length > 2000) {
      return res.status(400).json({
        error: 'El comentario es obligatorio y debe tener máximo 2000 caracteres.'
      });
    }

    let targetId = null;
    if (targetType !== 'general' && rawTargetId !== undefined && rawTargetId !== null) {
      const cleanedId = sanitizePlainText(String(rawTargetId));
      if (cleanedId.length > 50) {
        return res.status(400).json({ error: 'target_id excede 50 caracteres.' });
      }
      targetId = cleanedId || null;
    }

    let targetLabel = null;
    if (targetType === 'general') {
      targetLabel = 'Comentario General';
    } else if (rawTargetLabel !== undefined && rawTargetLabel !== null) {
      const cleanedLabel = sanitizePlainText(String(rawTargetLabel));
      if (cleanedLabel.length > 120) {
        return res.status(400).json({ error: 'target_label excede 120 caracteres.' });
      }
      targetLabel = cleanedLabel || null;
    }

    const { rows } = await pool.query(
      `INSERT INTO comments (author_name, target_type, target_id, target_label, body, status)
       VALUES ($1, $2, $3, $4, $5, 'open')
       RETURNING id, author_name, target_type, target_id, target_label, body, status, created_at`,
      [authorName, targetType, targetId, targetLabel, body]
    );

    return res.status(201).json({ comment: rows[0] });
  } catch (err) {
    return next(err);
  }
});

// PATCH /api/comments/:id
router.patch('/comments/:id', async (req, res, next) => {
  const pool = requirePool(res);
  if (!pool) return;

  try {
    const id = parsePositiveInt(req.params.id);
    if (!id) {
      return res.status(400).json({ error: 'ID de comentario inválido.' });
    }

    const status = typeof req.body?.status === 'string' ? req.body.status.trim() : '';
    if (!VALID_STATUSES.has(status)) {
      return res.status(400).json({ error: 'status debe ser open o resolved.' });
    }

    const { rows } = await pool.query(
      `UPDATE comments
       SET status = $1
       WHERE id = $2
       RETURNING id, author_name, target_type, target_id, target_label, body, status, created_at`,
      [status, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Comentario no encontrado.' });
    }

    return res.json({ comment: rows[0] });
  } catch (err) {
    return next(err);
  }
});

// DELETE /api/comments/:id
router.delete('/comments/:id', async (req, res, next) => {
  const pool = requirePool(res);
  if (!pool) return;

  try {
    const id = parsePositiveInt(req.params.id);
    if (!id) {
      return res.status(400).json({ error: 'ID de comentario inválido.' });
    }

    const { rows } = await pool.query(
      'DELETE FROM comments WHERE id = $1 RETURNING id',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Comentario no encontrado.' });
    }

    return res.json({ deleted: true, id: rows[0].id });
  } catch (err) {
    return next(err);
  }
});

// GET /api/updates
router.get('/updates', async (_req, res, next) => {
  const pool = requirePool(res);
  if (!pool) return;

  try {
    const { rows } = await pool.query(
      `SELECT id, author_name, summary, created_at
       FROM plan_updates
       ORDER BY created_at DESC, id DESC
       LIMIT 15`
    );
    return res.json({ updates: rows });
  } catch (err) {
    return next(err);
  }
});

// POST /api/updates
router.post('/updates', async (req, res, next) => {
  const pool = requirePool(res);
  if (!pool) return;

  try {
    const authorName = sanitizePlainText(req.body?.author_name);
    const summary = sanitizePlainText(req.body?.summary);

    if (!authorName || authorName.length > 80) {
      return res.status(400).json({
        error: 'El autor es obligatorio y debe tener máximo 80 caracteres.'
      });
    }
    if (!summary || summary.length > 240) {
      return res.status(400).json({
        error: 'El resumen de actualización es obligatorio y debe tener máximo 240 caracteres.'
      });
    }

    const { rows } = await pool.query(
      `INSERT INTO plan_updates (author_name, summary)
       VALUES ($1, $2)
       RETURNING id, author_name, summary, created_at`,
      [authorName, summary]
    );

    return res.status(201).json({ update: rows[0] });
  } catch (err) {
    return next(err);
  }
});

// GET /api/tiles/:z/:x/:y.png — Same-origin map tile proxy with in-memory cache
const tileCache = new Map();
const MAX_TILE_CACHE = 400;

router.get('/tiles/:z/:x/:y.png', async (req, res) => {
  const z = Number(req.params.z);
  const x = Number(req.params.x);
  const y = Number(req.params.y);

  if (
    !Number.isInteger(z) || z < 0 || z > 18 ||
    !Number.isInteger(x) || !Number.isInteger(y) ||
    x < 0 || y < 0 || x >= (1 << z) || y >= (1 << z)
  ) {
    return res.status(400).end();
  }

  const key = `${z}/${x}/${y}`;
  const cached = tileCache.get(key);
  if (cached) {
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(cached);
  }

  try {
    let upstream = await fetch(`https://tile.openstreetmap.org/${z}/${x}/${y}.png`, {
      headers: {
        'User-Agent': 'ViajeEuropa2027/1.0 (+https://viaje-europa-2027.onrender.com)'
      }
    });

    if (!upstream.ok) {
      upstream = await fetch(
        `https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/${z}/${y}/${x}`
      );
    }

    if (!upstream.ok) {
      return res.status(502).end();
    }

    const buf = Buffer.from(await upstream.arrayBuffer());
    if (tileCache.size >= MAX_TILE_CACHE) {
      const firstKey = tileCache.keys().next().value;
      tileCache.delete(firstKey);
    }
    tileCache.set(key, buf);

    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(buf);
  } catch {
    return res.status(502).end();
  }
});

module.exports = router;
