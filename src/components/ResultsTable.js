import { clickParcelId } from "../services/owners_pIDService";
import { useNavigate } from "react-router-dom";

export default function ResultsTable({ owners, searchQuery }) {
  const navigate = useNavigate();
  const handleClickParcelId = (parcelId) => {
    clickParcelId(parcelId);
    navigate(`/property-report/${parcelId}`);
  };
  if (searchQuery.length > 2 && owners.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <table className="results-table">
      <thead className="table-header">
        <tr>
          <th className="table-cell">Address</th>
          <th className="table-cell">Parcel ID</th>
        </tr>
      </thead>
      <tbody>
        {owners.map((owner, index) => (
          <tr key={index}>
            <td className="table-cell">{owner.situs_address || "N/A"}</td>
            {/* <td className="table-cell">{owner.situs_pID || "N/A"}</td> */}
            <td className="table-cell">
              <button onClick={() => handleClickParcelId(owner.parcel_id)}>
                {owner.parcel_id || "N/A"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
