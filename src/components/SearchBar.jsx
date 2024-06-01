function SearchBar({ searchQuery, onSearchChange, darkMode }) {
  return (
    <div className={`flex-grow mb-4 md:mb-0 md:mr-4  ${darkMode ? 'bg-gray-800 text-white':'bg-white text-white'}`} >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search movies..."
        className={`w-full p-2 border rounded focus:outline-none focus:border-blue-500 transition-all duration-300  ${darkMode ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'}`}
      />
    </div>
  );
}

export default SearchBar;
