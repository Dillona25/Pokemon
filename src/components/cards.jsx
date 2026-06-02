export const Cards = ({
  filteredPokemon,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <>
      <div className="row">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((p) => (
            <div className="col-12 col-sm-6 col-md-4 mb-4" key={p.id}>
              <div className="card pokemon-card h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                  <h5 className="text-capitalize m-0 font-weight-bold">
                    {p.name}
                  </h5>
                  <span className="text-muted small">#{p.id}</span>
                </div>
                <div className="text-center py-3 bg-light">
                  <img src={p.image} alt={p.name} className="pokemon-img" />
                </div>
                <div className="px-3 py-2">
                  <div className="text-uppercase small text-muted mb-1">
                    Type
                  </div>
                  <div className="d-flex justify-content-start flex-wrap">
                    {p.type.map((t) => (
                      <span key={t} className="small mr-3">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-3 pb-3 mt-auto">
                  <div className="text-uppercase small text-muted mb-1">
                    Stats
                  </div>
                  <div className="d-flex justify-content-between small">
                    <span>HP</span>
                    <span>{p.hp}</span>
                  </div>
                  <div className="d-flex justify-content-between small">
                    <span>Attack</span>
                    <span>{p.attack}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="my-5 py-5 mx-auto loading">
            No Pokemon found. Try revising your search.
          </h2>
        )}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
          <button
            className="btn btn-secondary mr-3"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            className="btn btn-secondary ml-3"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};
