import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pahiiutdrgjeiompfqho.supabase.co";
const supabaseKey = process.env.VUE_APP_SUPABASE_SERVICE_KEY
	? process.env.VUE_APP_SUPABASE_SERVICE_KEY
	: "Supabase key not found";

export const supabase = createClient(supabaseUrl, supabaseKey);
