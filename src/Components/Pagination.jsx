import React from "react";

const Pagination = ({ pageIndex, pageSize, totalCount, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const start = Math.max(1, pageIndex - 1);
    const end = Math.min(totalPages, pageIndex + 1);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination-wrapper">
      <button
        className="pg-btn"
        disabled={pageIndex === 1}
        onClick={() => onPageChange(1)}
      >
        First
      </button>

      <button
        className="pg-btn"
        disabled={pageIndex === 1}
        onClick={() => onPageChange(pageIndex - 1)}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {getVisiblePages().map((page) => (
        <button
          key={page}
          className={`pg-btn ${pageIndex === page ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {totalPages > 3 && pageIndex < totalPages - 1 && (
        <span className="pg-dots">...</span>
      )}

      <button
        className="pg-btn"
        disabled={pageIndex === totalPages}
        onClick={() => onPageChange(pageIndex + 1)}
      >
        Next
      </button>

      <button
        className="pg-btn"
        disabled={pageIndex === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
