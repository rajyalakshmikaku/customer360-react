import { useState } from "react";
import "./Complaints.css";

const ComplaintsMenu = ({ onView, counts, loading }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="complaints-menu">
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '12px', color: '#6b7280' }}>Loading complaints...</p>
        </div>
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
            className={`complaints-menu__item ${openIndex === i
                ? "complaints-menu--open complaints-menu--active"
                : ""
              }`}
          >
            <a
              href="#"
              className="complaints-menu__parent"
              onClick={(e) => {
                e.preventDefault();
                onView(item.Name, "");
              }}
            >
              <span className="complaints-menu__title">
                <div className="complaintsicon-circle">
                  <i className={`fa ${getIconForType(item.Name)}`} aria-hidden="true"></i>
                </div>
                <span className="complaints-name">{item.Name}</span>
              </span>

              <span className="complaints-menu__total">
                {item.Total}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintsMenu;


