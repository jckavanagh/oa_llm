const normalizeAddress = (address) => {
  if (!address || typeof address !== "string") {
    return "";
  }

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
      .replace(/\b(nth|north)\b/g, "n")
      .replace(/\b(sth|south)\b/g, "s")
      .replace(/\b(wst|west)\b/g, "w")
      .replace(/\b(est|east)\b/g, "e")
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

// Export the function
export default normalizeAddress;
