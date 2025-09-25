import Arrow from "../../icons/Arrow";

const Pagination = ({ onPageChange, totalCount, currentPage, pageSize }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        className="rotate-180"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Arrow />
      </button>
      <span style={{ margin: "0 10px" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Arrow />
      </button>
    </div>
  );
};

export default Pagination;
