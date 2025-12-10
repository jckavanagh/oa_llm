import { supabase } from "../lib/supabase";
import normalizeAddress from "../functions/normalize_address";

export async function searchOwners(query, limit = 10) {
  const normalizedQuery = normalizeAddress(query);

  const { data, error } = await supabase
    .from("Owners")
    .select("*")
    .ilike("situs_address", `${normalizedQuery}%`)
    .limit(limit);

  if (error) {
    throw error;
  }

  return data || [];
}
