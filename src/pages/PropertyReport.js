import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clickParcelId } from "../services/owners_pIDService";

export default function PropertyReport() {
  const { parcelId } = useParams(); // Get parcel_id from URL
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOwners() {
      try {
        setLoading(true);
        setError(null);
        const data = await clickParcelId(parcelId);
        setOwners(data);
      } catch (err) {
        console.error("Error fetching owners:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (parcelId) {
      fetchOwners();
    }
  }, [parcelId]);

  if (loading) {
    return <div>Loading property data...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => navigate("/")}>Back to Search</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2em" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "1em" }}>
        ← Back to Search
      </button>

      <h1>Property Report: {parcelId}</h1>

      {owners.length === 0 ? (
        <p>No owners found for this parcel.</p>
      ) : (
        <div>
          <h2>Owners ({owners.length})</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                {Object.keys(owners[0] || {}).map((key) => (
                  <th
                    key={key}
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {owners.map((owner, index) => (
                <tr key={index}>
                  {Object.values(owner).map((value, i) => (
                    <td
                      key={i}
                      style={{
                        border: "1px solid #ddd",
                        padding: "12px",
                      }}
                    >
                      {value !== null && value !== undefined
                        ? String(value)
                        : "N/A"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
