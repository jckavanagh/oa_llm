import { useState } from "react";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import SearchBar from "../components/SearchBar";
import ResultsTable from "../components/ResultsTable";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { results, loading, error } = useDebouncedSearch(searchQuery);

  return (
    <div className="search-container">
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* {loading && <p>Searching...</p>} */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ResultsTable owners={results} searchQuery={searchQuery} />
    </div>
  );
}
