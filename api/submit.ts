import { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// ------------------------
// Supabase client
// ------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

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

// ------------------------
// API Handler
// ------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data: BaseFormData = req.body;

    // Validate formType
    if (!data.formType || !(data.formType in tableMap)) {
      return res.status(400).json({ error: "Invalid or missing formType" });
    }

    const tableName = tableMap[data.formType as FormType];

    // Add timestamp
    data.timestamp = new Date().toISOString();

    // Insert into Supabase
    const { error } = await supabase.from(tableName).insert([data]);

    if (error) throw error;

    return res.status(200).json({ success: true });
  } catch (err: unknown) {
    console.error("Submission error:", err);

    return res.status(500).json({ error: "Server error" });
  }
}
