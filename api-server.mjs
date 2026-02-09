/**
 * Local dev server for /api/submit so the same endpoint works when running Vite.
 * Production uses Vercel serverless api/submit.ts.
 */
import express from "express";
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local into process.env
function loadEnvLocal() {
  const path = resolve(__dirname, ".env.local");
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf8");
  content.split("\n").forEach((line) => {
    const i = line.indexOf("=");
    if (i > 0) {
      const key = line.slice(0, i).trim();
      const value = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
      process.env[key] = value;
    }
  });
}
loadEnvLocal();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) in .env.local"
  );
}

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const tableMap = {
  USER_WAITLIST: "user_waitlist",
  STYLIST_WAITLIST: "stylist_waitlist",
  NOMINATE: "nominations",
};

/** Convert camelCase keys to snake_case for Supabase column names */
function toSnakeCase(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    const snake = k.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
    out[snake] = v;
  }
  return out;
}

const app = express();
app.use(express.json());

app.post("/api/submit", async (req, res) => {
  if (!supabase) {
    return res.status(503).json({ error: "Supabase not configured" });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body || {};
    if (!data.formType || !(data.formType in tableMap)) {
      return res.status(400).json({ error: "Invalid or missing formType" });
    }

    const tableName = tableMap[data.formType];
    const row = toSnakeCase({
      ...data,
      timestamp: new Date().toISOString(),
    });

    const { error } = await supabase.from(tableName).insert([row]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({
        error: "Server error",
        details: error.message,
        code: error.code,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Submission error:", err);
    return res.status(500).json({
      error: "Server error",
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
