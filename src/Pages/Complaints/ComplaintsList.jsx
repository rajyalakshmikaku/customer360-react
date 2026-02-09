import { useState } from "react";
import ComplaintsMenu from "./ComplaintsMenu";
import ComplaintsTable from "./ComplaintsTable";

const ComplaintsList = () => {
  const [showList, setShowList] = useState(false);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  // THIS gets called from menu
  const handleView = (category, status) => {
    setCategory(category);
    setStatus(status);
    setShowList(true);
  };

  return (
    <div className="d-flex">
      {/* LEFT MENU */}
      {!showList && <ComplaintsMenu onView={handleView} />}

      {/* RIGHT LIST PANEL */}
      {showList && (
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">
              {category} – {status}
            </h5>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => setShowList(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>

          <ComplaintsTable category={category} status={status} />
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
