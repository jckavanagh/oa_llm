import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase"; // Regular import at the top

export default function OwnersList() {
  const [owners, setOwners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceTimerRef = useRef(null);

  const normalizeAddress = (address) => {
    return (
      address
        .toLowerCase()
        // Remove periods and commas first
        .replace(/[.,]/g, "")
        // Remove suffixes after numbers
        .replace(/(\d+)th\b/g, "$1")
        .replace(/(\d+)st\b/g, "$1")
        .replace(/(\d+)nd\b/g, "$1")
        .replace(/(\d+)rd\b/g, "$1")
        // Normalize direction abbreviations
        .replace(/\b(nth|north)\b/, "n")
        .replace(/\b(sth|south)\b/, "s")
        .replace(/\b(wst|west)\b/, "w")
        .replace(/\b(est|east)\b/, "e")
        // Normalize common street suffixes
        .replace(/\b(street|st)\b/g, "st")
        .replace(/\b(avenue|ave)\b/g, "ave")
        .replace(/\b(road|rd)\b/g, "rd")
        .replace(/\b(boulevard|blvd)\b/g, "blvd")
        .replace(/\b(drive|dr)\b/g, "dr")
        .replace(/\b(lane|ln)\b/g, "ln")
        .replace(/\b(court|ct)\b/g, "ct")
        .replace(/\b(place|pl)\b/g, "pl")
        .replace(/\b(circle|cir)\b/g, "cir")
        .replace(/\b(highway|hwy)\b/g, "hwy")
        .replace(/\b(parkway|pkwy)\b/g, "pkwy")
        .replace(/\b(trail|trl)\b/g, "trl")
        .replace(/\b(terrace|tr)\b/g, "tr")
        .replace(/\b(way|wy)\b/g, "wy")
        // Normalize multiple spaces with a single space
        .replace(/\s+/g, " ")
        .trim()
    );
  };

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (searchQuery.trim().length < 2) {
      setOwners([]);
      return;
    }

    const normalizedQuery = normalizeAddress(searchQuery);

    debounceTimerRef.current = setTimeout(async () => {
      const { data, error } = await supabase
        .from("Owners")
        .select("*")
        .ilike("situs_address", `${normalizedQuery}%`);

      if (!error) {
        setOwners(data || []);
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by address..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
      <table>
        <tbody>
          {owners.map((owner, index) => (
            <tr key={index}>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                {owner.situs_address || "N/A"}
              </td>
              <td>{owner.situs_pID || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
