import { useState } from "react";
import "./Complaints.css";

const ComplaintsMenu = ({ onView, counts, loading }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Icon mapping for complaints types
  const getIconForType = (name) => {
    const iconMap = {
      'HOTSPOT': 'fa-fire',
      'ROADCLOSURE': 'fa-ban',
      'MEETING': 'fa-users',
      'MISSINGPERSON': 'fa-user-secret',
      'HEALTHCARE': 'fa-hospital-o',
      'WORKSHOP': 'fa-wrench',
      'WARNING': 'fa-exclamation-triangle',
      'COMPLAINT': 'fa-comments-o',
      'INCIDENT': 'fa-exclamation-circle',
      'REPORT': 'fa-file-text',
      'REQUEST': 'fa-lightbulb-o',
      'FEEDBACK': 'fa-thumbs-up',
    };
    return iconMap[name?.toUpperCase()] || 'fa-exclamation-circle';
  };

  return (
    <div className="complaints-menu">
      <ul className="complaints-menu__list">
        {counts?.map((item, i) => (
          <li
  key={i}
  className="complaints-menu__item"
>
  <div
    className="complaints-card"
    // onClick={() => onView(item.Name, "")}
  >
    <div className="card-header">
      <div className="complaintsicon-circle">
        <i className={`fa ${getIconForType(item.Name)}`} aria-hidden="true"></i>
      </div>
      <span className="complaints-name">{item.Name}</span>
    </div>

    <div className="card-stats" onClick={() => onView(item.Name, "")}>
      <div className="stat-box total">
        <span>{item.Total}</span>
        <small>Total</small>
      </div>

      <div className="stat-box active" onClick={() => onView(item.Name, "Active")}>
        <span>{item.Active}</span>
        <small>Active</small>
      </div>

      <div className="stat-box inactive" onClick={() => onView(item.Name, "In-Active")}>
        <span>{item.InActive}</span>
        <small>Inactive</small>
      </div>

      <div className="stat-box pending" onClick={() => onView(item.Name, "Pending")}>
        <span>{item.Pending}</span>
        <small>Pending</small>
      </div>

      <div className="stat-box completed" onClick={() => onView(item.Name, "Completed")}>
        <span>{item.Completed}</span>
        <small>Completed</small>
      </div>
    </div>
  </div>
</li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintsMenu;


