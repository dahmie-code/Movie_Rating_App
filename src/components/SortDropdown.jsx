// SortDropdown component for sorting movies
function SortDropdown({ sortOption, onSortChange, darkMode }) {
  return (
    <div className="mb-4 md:mb-0">
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className={`p-2 border rounded focus:outline-none focus:border-blue-500 border-gray-300 transition-all duration-300 ${darkMode?'bg-gray-800 text-gray-300':'bg-white-100 text-gray-700'}`}

      >
        <option value="default">Sort by default</option>
        <option value="highest">Sort by Highest Rating</option>
        <option value="lowest">Sort by Lowest Rating</option>
        <option value="noRatings">Sort by No Ratings</option>
      </select>
    </div>
  );
}

export default SortDropdown;
