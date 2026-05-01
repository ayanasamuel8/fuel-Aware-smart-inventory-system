# Backend — Fuel-Aware Smart Inventory System

Node.js / Express backend that connects to Supabase and exposes the REST API used by the frontend and hardware devices.

## Requirements

- Node.js 18+
- A [Supabase](https://supabase.com) project with the schema applied (see below)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your Supabase project credentials:

   ```bash
   cp .env.example .env
   ```

   | Variable           | Description                                  |
   |--------------------|----------------------------------------------|
   | `SUPABASE_URL`     | Your Supabase project URL                    |
   | `SUPABASE_ANON_KEY`| Your Supabase project anon/public API key    |
   | `PORT`             | HTTP port to listen on (default: `3000`)     |

3. **Apply the database schema**

   Open the Supabase SQL Editor for your project and run the contents of [`schema.sql`](./schema.sql).

4. **Start the server**

   ```bash
   # Production
   npm start

   # Development (auto-reload on file changes)
   npm run dev
   ```

   The server will be available at `http://localhost:3000`.

## API Endpoints

| Method | Path                                   | Description                         |
|--------|----------------------------------------|-------------------------------------|
| GET    | `/health`                              | Health check                        |
| POST   | `/api/telemetry`                       | Ingest telemetry payload            |
| GET    | `/api/vehicles`                        | List all vehicles                   |
| POST   | `/api/vehicles`                        | Register a new vehicle              |
| GET    | `/api/vehicles/:vehicleId/latest`      | Latest state for a vehicle          |
| GET    | `/api/vehicles/:vehicleId/history`     | Telemetry history for a vehicle     |
| GET    | `/api/vehicles/:vehicleId/alerts`      | Alerts for a vehicle                |
| GET    | `/api/vehicles/:vehicleId/trips`       | Trip summaries for a vehicle        |

See [`docs/API_CONTRACTS.md`](../docs/API_CONTRACTS.md) for full payload specifications.

## Project Structure

```
backend/
├── src/
│   ├── index.js            # Express app entry point
│   ├── supabaseClient.js   # Supabase client initialisation
│   └── routes/
│       ├── telemetry.js    # POST /api/telemetry
│       └── vehicles.js     # GET/POST /api/vehicles and sub-routes
├── schema.sql              # SQL to create all Supabase tables
├── .env.example            # Template for required environment variables
└── package.json
```
