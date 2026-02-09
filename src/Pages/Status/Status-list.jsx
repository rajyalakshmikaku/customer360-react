import { useState } from "react";
import StatusTable from "./StatusTable";
import StatusMenu from "./StatusMenu";

const StatusList = () => {
  const [showList, setShowList] = useState(false);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const handleView = (category, status) => {
    setCategory(category);
    setStatus(status);
    setShowList(true);
  };

  return (
    <div className="d-flex">
      {!showList && <StatusMenu onView={handleView} />}

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

          {/* ✅ CORRECT COMPONENT */}
          <StatusTable category={category} status={status} />
        </div>
      )}
    </div>
  );
};

export default StatusList;
