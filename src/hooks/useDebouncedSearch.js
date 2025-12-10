import { useEffect, useState, useRef } from "react";
import { searchOwners } from "../services/ownersService";

export function useDebouncedSearch(searchQuery, minLength = 2, delay = 300) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Reset if query is too short
    if (searchQuery.trim().length < minLength) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    // Set up debounced search
    debounceTimerRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await searchOwners(searchQuery);
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
        setError(err.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, delay);

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery, minLength, delay]);

  return { results, loading, error };
}
