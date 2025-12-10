import normalizeAddress from "../functions/normalize_address";

const PARCELS_JSON_URL =
  "https://kuuvyfrchzsodnqitchn.supabase.co/storage/v1/object/public/Parcels/parcels.json";

// Cache the fetched data to avoid re-fetching on every search
let cachedParcels = null;
let fetchPromise = null;

async function fetchParcels() {
  // If already fetching, return the existing promise
  if (fetchPromise) {
    return fetchPromise;
  }

  // If already cached, return cached data
  if (cachedParcels) {
    return cachedParcels;
  }

  // Fetch and cache the data
  fetchPromise = fetch(PARCELS_JSON_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch parcels: ${response.statusText}`);
      }
      console.log("response.json");
      return response.json();
    })
    .then((data) => {
      cachedParcels = data;
      fetchPromise = null; // Clear the promise
      return data;
    })
    .catch((error) => {
      fetchPromise = null; // Clear the promise on error
      throw error;
    });

  return fetchPromise;
}

export async function searchParcels(query, limit = 10) {
  const normalizedQuery = normalizeAddress(query);

  try {
    // Fetch all parcels (will use cache after first fetch)
    const allParcels = await fetchParcels();

    // Filter parcels client-side based on normalized address
    const filteredParcels = allParcels.filter((parcel) => {
      if (!parcel.situs_address) return false;

      const parcelAddress = parcel.situs_address.toLowerCase();
      return parcelAddress.includes(normalizedQuery);
      //   const normalizedAddress = normalizeAddress(parcelAddress);
      //   return normalizedAddress.startsWith(normalizedQuery);
    });

    // Limit results
    console.log("filteredParcels", filteredParcels);
    return filteredParcels.slice(0, limit);
  } catch (error) {
    console.error("Error searching parcels:", error);
    throw error;
  }
}

// Optional: Function to get a single parcel by ID
export async function getParcelById(parcelId) {
  try {
    const allParcels = await fetchParcels();
    return allParcels.find((parcel) => parcel.parcel_id === parcelId) || null;
  } catch (error) {
    console.error("Error getting parcel:", error);
    throw error;
  }
}

// Optional: Function to clear cache (useful if data is updated)
export function clearParcelsCache() {
  cachedParcels = null;
  fetchPromise = null;
}
