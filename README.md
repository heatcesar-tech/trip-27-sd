# Circuito Europa 2027 — Mapa Interactivo y Comentarios

Aplicación web full-stack (Node.js + Express + PostgreSQL + D3/TopoJSON + Tailwind CSS) para revisar el itinerario de 16 días por Madrid, Italia y Oporto, con sistema persistente de comentarios por día, tramo, parada o comentario general, e historial de actualizaciones.

## Estructura del proyecto

- `server.js` — Servidor Express (sirve `/public` y la API `/api/*`, puerto dinámico `process.env.PORT || 3000`).
- `src/db.js` — Pool de PostgreSQL con SSL condicional en producción/conexiones remotas y auto-inicialización de tablas (`comments`, `plan_updates`).
- `src/routes/api.js` — Endpoints REST (`/api/health`, `/api/comments`, `/api/updates`).
- `public/index.html` y `public/app.js` — Frontend interactivo con mapa vectorial D3/TopoJSON y panel de comentarios.
- `render.yaml` — Blueprint opcional de Render (Web Service + PostgreSQL).

---

## 1. Correr en local

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Crea tu archivo `.env` a partir de `.env.example` y configura tu PostgreSQL local (o una URL de PostgreSQL):
   ```bash
   cp .env.example .env
   ```
   Edita `.env`:
   ```env
   DATABASE_URL=postgres://user:pass@localhost:5432/viaje
   PORT=3000
   NODE_ENV=development
   ```
3. Inicia el servidor:
   ```bash
   npm start
   ```
4. Abre `http://localhost:3000`.
   > Si no tienes PostgreSQL corriendo en local, el servidor arrancará igual y mostrará el mapa en modo lectura; `/api/health` responderá `503` con `{ ok: false }` hasta que configures una base de datos válida.

---

## 2. Desplegar en Render.com (Web Service + PostgreSQL)

### Opción A: Usando Blueprint (`render.yaml`)
1. En el dashboard de **Render.com**, haz clic en **New + → Blueprint**.
2. Conecta este repositorio de GitHub.
3. Render detectará automáticamente `render.yaml`, creará la base de datos PostgreSQL (`viaje-europa-db`) y el Web Service (`viaje-europa-2027`) vinculados por `DATABASE_URL`.
4. Haz clic en **Apply** y espera a que finalice el primer build.

### Opción B: Configuración manual en Render
1. **Crear PostgreSQL:**
   - **New + → PostgreSQL**, elige un nombre (ej. `viaje-europa-db`) y plan **Free**.
   - Copia la **Internal Database URL** una vez creada.
2. **Crear Web Service:**
   - **New + → Web Service** y conecta este repositorio de GitHub.
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
   - **Environment Variables:**
     - `DATABASE_URL` = *(pega la Internal Database URL de tu PostgreSQL)*
     - `NODE_ENV` = `production`
3. Al arrancar por primera vez, el servidor ejecutará `CREATE TABLE IF NOT EXISTS` automáticamente y quedará listo para usarse.

---

## Endpoints de la API

- `GET /api/health` — Verifica conexión a PostgreSQL (`SELECT 1`).
- `GET /api/comments` — Lista comentarios (filtros opcionales: `target_type`, `target_id`, `status`).
- `POST /api/comments` — Crea un nuevo comentario (texto plano sanitizado).
- `PATCH /api/comments/:id` — Actualiza el estado (`open` | `resolved`).
- `DELETE /api/comments/:id` — Elimina un comentario.
- `GET /api/updates` — Lista las últimas actualizaciones del itinerario.
- `POST /api/updates` — Registra una nueva actualización del itinerario.
