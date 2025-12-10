export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder={placeholder || "Search by address..."}
      value={value}
      onChange={onChange}
    />
  );
}
