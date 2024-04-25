import React, { useContext, useState, useEffect } from "react";
import "../css/navbar.css";
import logo from "../img/OIP.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faNewspaper,
} from "@fortawesome/free-regular-svg-icons";
import { faChartGantt } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../App";

const Navbar = () => {
  const value = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("invoice");
  const [isnav, toggleMenu] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const time = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentDate(date);
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === "invoice") {
      value.setCurrentPath("invoice");
      value.setInvoice(true);
      value.setAnalysis(false);
    } else if (tabName === "analysis") {
      value.setCurrentPath("analysis");
      value.setInvoice(false);
      value.setAnalysis(true);
    }
  };

  const handleToggleMenu = () => {
    toggleMenu(!isnav);
  };

  return (
    <>
      <nav className="nav_bar print">
        <div className="nav_logo">
          <img src={logo} alt="logo" />
          <h1 className="title">Invoice</h1>
        </div>
        <div className={`toggle_bar `}>
          <div
            className={`inner_toggle ${isnav ? "active" : ""}`}
            onClick={handleToggleMenu}
          >
            <span className="line li-top"></span>
            <span className="line li-mid"></span>
            <span className="line li-bot"></span>
          </div>
        </div>
        <ul className={`nav_options ${isnav ? "active" : ""}`}>
          <li
            className={`nav_button ${activeTab === "invoice" ? "active" : ""}`}
            onClick={() => handleTabClick("invoice")}
          >
            <FontAwesomeIcon className="icon" icon={faNewspaper} />
            invoice
          </li>
          <li
            className={`nav_button ${activeTab === "analysis" ? "active" : ""}`}
            onClick={() => handleTabClick("analysis")}
          >
            <FontAwesomeIcon className="icon" icon={faChartGantt} />
            analysis
          </li>
        </ul>
      </nav>
      <header className="section_header print">
        <h1 className="section_title">
          <span className="current_path">App / </span>
          <span className="current_title">
            {value.currentPath ? value.currentPath : " Invoice"}
          </span>
        </h1>
        <div className="date_time">
          <div className="date">
            <div className="icon">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            <p className="text">{currentDate}</p>
          </div>
          <div className="time">
            <div className="icon">
              <FontAwesomeIcon icon={faClock} />
            </div>
            <p className="text">{currentTime}</p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
