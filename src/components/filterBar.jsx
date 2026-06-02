export const FilterBar = ({ search, setSearch, filter, setFilter }) => {
  return (
    <div className="row mb-5">
      <div className="col-12">
        <div className="d-flex flex-column flex-md-row align-items-md-center">
          <div className="flex-grow-1 mr-md-3 mb-2 mb-md-0">
            <input
              type="text"
              className="form-control"
              placeholder="Search Pokemon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <select
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="High Health">High Health</option>
              <option value="Low Health">Low Health</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
