# Supabase setup for waitlist forms (anon key only)

The API uses only the **anon** key. For form submissions to be saved, allow the anon role to INSERT via RLS policies.

## Steps

1. In **Supabase Dashboard** → **SQL Editor**, open and run `schema-and-rls.sql`.
   - If your tables already exist, run only the **RLS** and **Policies** sections (from "Enable RLS" onward). If you get "policy already exists", skip that policy or drop it first.
   - If you need to create tables, run the whole file.
2. In **Vercel** (and in `.env.local` for local dev), set:
   - `NEXT_PUBLIC_SUPABASE_URL` = your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) = the anon public key from Supabase → Project Settings → API

The policies in the SQL file allow the **anon** role to **INSERT** into the waitlist/nomination tables.

---

## Table and column names

The API sends data with **snake_case** columns. Your tables should have (or be aligned to) at least:

- **user_waitlist:** `full_name`, `email`, `form_type`, `timestamp`
- **stylist_waitlist:** `full_name`, `email`, `ig_user_name`, `location`, `form_type`, `timestamp`
- **nominations:** `stylist_name`, `stylist_email`, `location`, `form_type`, `timestamp`

If your existing columns use different names, either rename them in Supabase or update the API to match.
