import { useState } from "react";
import "./Status.css";
const StatusMenu = ({ onView }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const complaints = [
    { name: "STATUS LIST", total: 47, completed: 5, pending: 0, active: 12, inactive: 27 },
    //{ name: "ROADCLOSURE", total: 35 },
    //{ name: "MEETING", total: 37 },
    //{ name: "MISSINGPERSON", total: 21 },
    //{ name: "HEALTHCARE", total: 20 },
    //{ name: "WORKSHOP", total: 19 },
    //{ name: "WARNING", total: 26 },
  ];

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


 return (
  <aside className="complaints-menu">
  <ul className="complaints-menu__list">
    {complaints.map((item, i) => (
      <li
        key={i}
        className={`complaints-menu__item ${
          openIndex === i ? "complaints-menu--open complaints-menu--active" : ""
        }`}
      >
        <a
          href="#"
          className="complaints-menu__parent"
          onClick={(e) => {
            e.preventDefault();
            toggleMenu(i);
          }}
        >
          <span className="complaints-menu__title">{item.name}</span>
          <span className="complaints-menu__total">
            Total : {item.total}
          </span>
        </a>

        {openIndex === i && (
          <ul className="complaints-menu__sub">
            {/* <li>
              <a
                className="complaints-menu__link"
                onClick={() => onView(item.name, "Completed")}
              >
                Completed
                <span  className="complaints-menu__count completed">
                  {item.completed}
                </span>
              </a>
            </li> */}
            <li>
              <a
                className="complaints-menu__link"
                onClick={() => onView(item.name, "Pending")}
              >
                Pending
                <span className="complaints-menu__count pending">
                  {item.pending}
                </span>
              </a>
            </li>
            {/* <li>
              <a
                className="complaints-menu__link"
                onClick={() => onView(item.name, "Active")}
              >
                Active
                <span className="complaints-menu__count active">
                  {item.active}
                </span>
              </a>
            </li>
            <li>
              <a
                className="complaints-menu__link"
                onClick={() => onView(item.name, "In-Active")}
              >
                In-Active
                <span className="complaints-menu__count inactive">
                  {item.inactive}
                </span>
              </a>
            </li> */}
          </ul>
        )}
      </li>
    ))}
  </ul>
</aside>


);

};

export default StatusMenu;
