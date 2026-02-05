import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;

    if (!data.formType) {
      return res.status(400).json({ error: "Missing formType" });
    }

    // Map formType to table name
    const tableName = {
      USER_WAITLIST: "user_waitlist",
      STYLIST_WAITLIST: "stylist_waitlist",
      NOMINATE: "nominations",
      LEARN_MORE: "learn_more",
    }[data.formType];

    if (!tableName) return res.status(400).json({ error: "Invalid formType" });

    // Add timestamp
    data.timestamp = new Date().toISOString();

    // Insert into Supabase
    const { error } = await supabase.from(tableName).insert([data]);

    if (error) throw error;

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
