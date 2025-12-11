import { supabase } from "../lib/supabase";

export async function clickParcelId(parcel_id) {
  const { data, error } = await supabase
    .from("Owners")
    .select("*")
    .eq("situs_pID", parcel_id);

  if (error) {
    throw error;
  }

  console.log("data", data);
  return data || [];
}
