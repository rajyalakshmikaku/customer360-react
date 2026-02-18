import React from "react";

const Pagination = ({ pageIndex, pageSize, totalCount, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="d-flex justify-content-center py-3">
      <nav>
        <ul className="pagination pagination-sm mb-0">

          {/* Previous */}
          <li className={`page-item ${pageIndex === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(pageIndex - 1)}
            >
              <i className="bx bx-chevrons-left"></i>
            </button>
          </li>

          {/* Pages */}
          {getPages().map((page) => (
            <li
              key={page}
              className={`page-item ${page === pageIndex ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}

          {/* Next */}
          <li className={`page-item ${pageIndex === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(pageIndex + 1)}
            >
              <i className="bx bx-chevrons-right"></i>
            </button>
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
