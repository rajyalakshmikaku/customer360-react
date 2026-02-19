import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComplaintsMenu from "./ComplaintsMenu";
import ComplaintsTable from "./ComplaintsTable";
import { fetchComplaintsCounts,fetchwardInfo ,fetchUserInfo,fetchComplaintsListInfo,fetchApproveComplaintsInfo } from "../../redux/complaintListSlice";
import Pagination from "../../Components/Pagination";
import alertify from "alertifyjs";


const ComplaintsList = () => {
  const [showList, setShowList] = useState(false);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [loadingType, setLoadingType] = useState(null);


  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;


  const dispatch = useDispatch();
  const { counts, loading, wardInfo,UserInfo,ComplaintsListInfo,WardType,totalCount,onSearch,ApproveInfo} = useSelector((state) => state.complaints);
  
  //console.log('ApproveInfo',ApproveInfo);
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

  const handleSearch = (ward, user) => {
  setPageIndex(1);

  dispatch(fetchComplaintsListInfo({
    pageIndex: 1,
    pageSize: pageSize,
    search: "",
    type: category,
    status: status,
    role: userType,
    wardId: ward || "",
    userId: user || ""
  }));
};


  const handlePageChange = (page) => {
  if (page < 1) return;

  setPageIndex(page);

  dispatch(fetchComplaintsListInfo({
    pageIndex: page,
    pageSize: pageSize,
    search: "",
    type: category,
    status: status,
    role: userType,
    wardId: "",
    userId: ""
  }));
};

useEffect(() => {
  if (ApproveInfo?.success) {
    alertify.alert("Message", ApproveInfo.message);

    dispatch(fetchComplaintsListInfo({
      pageIndex,
      pageSize,
      search: "",
      type: category,
      status: status,
      role: userType,
      wardId: "",
      userId: ""
    }));
  }
}, [ApproveInfo]);



  const wardNo = 0;
  useEffect(() => {
    dispatch(fetchComplaintsCounts(wardNo));
  }, [dispatch, wardNo]);

  const handleStatusChange = (userId, status, screen, comments = "") => {
    return dispatch(
        fetchApproveComplaintsInfo({
            UserId: userId,
            Status: status,
            Screen: screen,
            Comments: comments
        })
    ).unwrap(); 
};


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
          <ComplaintsTable category={category} status={status} wardInfo={wardInfo} UserInfo={UserInfo} ComplaintsListInfo={ComplaintsListInfo} WardType={WardType} totalCount={totalCount} onSearch={handleSearch}  onStatusChange={handleStatusChange} approveSuccess={ApproveInfo?.success}/>

          <Pagination pageIndex={pageIndex} pageSize={pageSize} totalCount={totalCount} onPageChange={handlePageChange}/>
          
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
