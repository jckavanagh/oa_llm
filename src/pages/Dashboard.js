import { useState } from "react";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { results, loading, error } = useDebouncedSearch(searchQuery);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by address..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading && <p>Searching...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <table>
        <tbody>
          {results.map((owner, index) => (
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
