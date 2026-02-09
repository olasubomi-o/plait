import { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// ------------------------
// Supabase client (anon key only).
// Run supabase/schema-and-rls.sql in Supabase SQL Editor so anon can INSERT.
// ------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// ------------------------
// Types
// ------------------------
export enum FormType {
  USER_WAITLIST = "USER_WAITLIST",
  STYLIST_WAITLIST = "STYLIST_WAITLIST",
  NOMINATE = "NOMINATE"
}

// Generic form data type — can extend per modal if needed
export interface BaseFormData {
  formType: FormType;
  timestamp?: string;
  [key: string]: any; // other fields vary per modal
}

// Table map
const tableMap: Record<FormType, string> = {
  [FormType.USER_WAITLIST]: "user_waitlist",
  [FormType.STYLIST_WAITLIST]: "stylist_waitlist",
  [FormType.NOMINATE]: "nominations"
};

/** Convert camelCase keys to snake_case for Supabase column names */
function toSnakeCase(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    const snake = k.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
    out[snake] = v;
  }
  return out;
}

// ------------------------
// API Handler
// ------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!supabase) {
    return res.status(503).json({
      error: "Supabase not configured",
      details:
        "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) in Vercel Environment Variables. For inserts to work with anon key, run supabase/schema-and-rls.sql in Supabase SQL Editor.",
    });
  }

  try {
    // Vercel may pass body as string; ensure we have an object
    let data: BaseFormData =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    // Validate formType
    if (!data.formType || !(data.formType in tableMap)) {
      return res.status(400).json({ error: "Invalid or missing formType" });
    }

    const tableName = tableMap[data.formType as FormType];

    // Add timestamp and convert to snake_case for Supabase columns
    const row = toSnakeCase({
      ...data,
      timestamp: new Date().toISOString(),
    });

    // Insert into Supabase
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
  } catch (err: unknown) {
    console.error("Submission error:", err);

    return res.status(500).json({
      error: "Server error",
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
