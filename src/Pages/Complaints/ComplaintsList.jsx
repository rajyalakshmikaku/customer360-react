import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComplaintsMenu from "./ComplaintsMenu";
import ComplaintsTable from "./ComplaintsTable";
import { fetchComplaintsCounts,fetchwardInfo ,fetchUserInfo,fetchComplaintsListInfo} from "../../redux/complaintListSlice";

const ComplaintsList = () => {
  const [showList, setShowList] = useState(false);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const { counts, loading, wardInfo,UserInfo,ComplaintsListInfo,WardType} = useSelector((state) => state.complaints);
  //console.log('ComplaintsListInfo',ComplaintsListInfo);
  const userType = sessionStorage.getItem("LoggedUserType");
  // THIS gets called from menu
  const handleView = (category, status) => {
    setCategory(category);
    setStatus(status);
    setShowList(true);
    dispatch(fetchwardInfo(category));
    dispatch(fetchUserInfo());
    dispatch(fetchComplaintsListInfo({
      pageIndex: 1,
      pageSize: 10,
      search: "",
      type: category,
      status: status,
      role: userType,
      wardId: "",
      userId: ""
    }))

  };

  
  const wardNo = 0;
  useEffect(() => {
    dispatch(fetchComplaintsCounts(wardNo));
  }, [dispatch, wardNo]);

  return (
    <div className="d-flex">
      {/* LEFT MENU */}
      {!showList && <ComplaintsMenu onView={handleView} counts={counts} loading={loading}  />}

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

          <ComplaintsTable category={category} status={status} wardInfo={wardInfo} UserInfo={UserInfo} ComplaintsListInfo={ComplaintsListInfo} WardType={WardType}/>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
