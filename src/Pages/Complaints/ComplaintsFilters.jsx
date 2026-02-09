const ComplaintsMenu = ({ onView }) => {
  const complaints = [
    { name: "Road Issues", total: 20, completed: 5, pending: 10, active: 3, inactive: 2 },
    { name: "Water Issues", total: 15, completed: 8, pending: 5, active: 1, inactive: 1 }
  ];

  return (
    <aside id="layout-menu" className="menu-vertical menu bg-menu-theme">
      <ul className="menu-inner py-1">
        {complaints.map((item, i) => (
          <li className="menu-item" key={i}>
            <a href="#" className="menu-link menu-toggle">
              <div>{item.name}</div>
              <span className="ms-2 text-danger">Total : {item.total}</span>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a className="menu-link" onClick={() => onView(item.name, "Completed")}>
                  Completed ({item.completed})
                </a>
              </li>
              <li className="menu-item">
                <a className="menu-link" onClick={() => onView(item.name, "Pending")}>
                  Pending ({item.pending})
                </a>
              </li>
              <li className="menu-item">
                <a className="menu-link" onClick={() => onView(item.name, "Active")}>
                  Active ({item.active})
                </a>
              </li>
              <li className="menu-item">
                <a className="menu-link" onClick={() => onView(item.name, "In-Active")}>
                  In-Active ({item.inactive})
                </a>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ComplaintsMenu;
