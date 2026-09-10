function SearchBox({ searchText, onSearchChange, filterLevel, onFilterChange, onClear }) {
  return (
    <section className="search-box">
      <div>
        <h2>ค้นหาและกรองรายวิชา</h2>
        <p>พิมพ์คำค้นหา หรือกรองตามระดับความยากของเนื้อหา</p>
      </div>

      <div className="search-controls">
        <input
          type="text"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="ค้นหารายวิชาหรือหมวดหมู่..."
          aria-label="ค้นหารายวิชา"
        />
        
        <select 
          value={filterLevel} 
          onChange={(event) => onFilterChange(event.target.value)}
          aria-label="กรองตามระดับความยาก"
        >
          <option value="">-- ทุกระดับ --</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {(searchText || filterLevel) && (
          <button className="clear-btn" onClick={onClear}>ล้างค่า</button>
        )}
      </div>
    </section>
  )
}

export default SearchBox