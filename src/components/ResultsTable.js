export default function ResultsTable({ owners, searchQuery }) {
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
            <td className="table-cell">{owner.parcel_id || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
