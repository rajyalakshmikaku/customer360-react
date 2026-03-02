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
  
  console.log('ComplaintsListInfo',ComplaintsListInfo);
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

    alertify.alert("Message", ApproveInfo.message, function () {

      // ✅ CLOSE MODAL HERE
      setShowList(false); // optional if needed

      // ✅ REFRESH LIST
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

      // ✅ REFRESH COUNTS
      dispatch(fetchComplaintsCounts(wardNo));

    });

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

const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Pending":
                return "badge bg-warning text-dark";
            case "Active":
                return "badge bg-primary";
            case "Completed":
                return "badge bg-success";
            case "In-Active":
                return "badge bg-secondary";
            case "Rejected":
                return "badge bg-danger";
            default:
                return "badge bg-light text-dark";
        }
    };

  return (
    <div className="complaints-wrapper">
      {/* LEFT MENU */}
      {!showList && <ComplaintsMenu onView={handleView} counts={counts} loading={loading} />}

      {/* RIGHT LIST PANEL */}
      {showList && (
        <div className="complaints-content">
          <div className="complaints-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="complaints-header-icon">
                <i className="fa fa-list-check"></i>
              </div>
              <div>
                <h2 style={{ marginBottom: '4px' }}>{category}</h2>
                <span className={`complaints-header-badge badge-${status.toLowerCase()}`}>
                  {status}
                </span>
              </div>
            </div>

            <button
              className="close-button"
              onClick={() => setShowList(false)}
              title="Close and back to menu"
            >
              <i className="fa fa-chevron-left"></i>
              <span>Back</span>
            </button>
          </div>

          <div style={{ flex: 1, overflow: 'auto' }}>
            <ComplaintsTable category={category} status={status} wardInfo={wardInfo} UserInfo={UserInfo} ComplaintsListInfo={ComplaintsListInfo} WardType={WardType} totalCount={totalCount} onSearch={handleSearch} onStatusChange={handleStatusChange} approveSuccess={ApproveInfo?.success}/>

            <Pagination pageIndex={pageIndex} pageSize={pageSize} totalCount={totalCount} onPageChange={handlePageChange}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
