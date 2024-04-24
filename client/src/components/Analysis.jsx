import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "../css/analysis.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMaximize,
  faMinimize,
  faSearch,
  faSearchPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const Analysis = () => {
  const todayInvoice = [
    { productId: "#0001", NoFProduct: 5, date: "11/11/1111" },
    { productId: "#0002", NoFProduct: 6, date: "11/11/1111" },
    { productId: "#0003", NoFProduct: 10, date: "11/11/1111" },
  ];
  const weekInvoice = [
    { productId: "#0001", NoFProduct: 5, date: "11/11/1111" },
    { productId: "#0002", NoFProduct: 6, date: "11/11/1111" },
    { productId: "#0003", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0004", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0005", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0006", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0007", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0008", NoFProduct: 10, date: "11/11/1111" },
  ];
  const monthInvoice = [
    { productId: "#0001", NoFProduct: 5, date: "11/11/1111" },
    { productId: "#0002", NoFProduct: 6, date: "11/11/1111" },
    { productId: "#0003", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0001", NoFProduct: 5, date: "11/11/1111" },
    { productId: "#0002", NoFProduct: 6, date: "11/11/1111" },
    { productId: "#0003", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0004", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0005", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0006", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0007", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0008", NoFProduct: 10, date: "11/11/1111" },
  ];
  const yearInvoice = [
    { productId: "#0001", NoFProduct: 5, date: "11/11/1111" },
    { productId: "#0002", NoFProduct: 6, date: "11/11/1111" },
    { productId: "#0003", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0001", NoFProduct: 5, date: "11/11/1111" },
    { productId: "#0002", NoFProduct: 6, date: "11/11/1111" },
    { productId: "#0003", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0004", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0005", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0006", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0007", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0008", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0001", NoFProduct: 5, date: "11/11/1111" },
    { productId: "#0002", NoFProduct: 6, date: "11/11/1111" },
    { productId: "#0003", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0001", NoFProduct: 5, date: "11/11/1111" },
    { productId: "#0002", NoFProduct: 6, date: "11/11/1111" },
    { productId: "#0003", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0004", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0005", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0006", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0007", NoFProduct: 10, date: "11/11/1111" },
    { productId: "#0008", NoFProduct: 10, date: "11/11/1111" },
  ];
  const [showSearch, setshowSearch] = useState(false);
  const [activeButton, setActiveButton] = useState("today");
  const [result, setResult] = useState(todayInvoice);
  const [chatItem, setChartItem] = useState(todayInvoice);
  const [fullScreen, setFullScreen] = useState(false);
  const [view, setViewPopup] = useState(false);

  useEffect(() => {
    // Prepare data for the chart based on items
    const data = {
      labels: chatItem.map((item) => item.productId), // Generate labels based on product names
      datasets: [
        {
          label: "Price", // Optionally, you can specify a label for the dataset
          data: chatItem.map((item) => item.NoFProduct),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    // Get the canvas element
    const ctx = document.getElementById("myChart");

    // Create the chart
    const myChart = new Chart(ctx, {
      type: "line", // Change type to "line" for a curved line chart
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function to destroy the chart
    return () => {
      myChart.destroy();
    };
  }, [chatItem]); // Include items in the dependency array to update the chart when items change

  const handleSearchSubmit = (e) => {
    console.log(e.target);
  };

  const Popup = () => {
    return (
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={() => setshowSearch(false)}>
            &times;
          </span>
          <h2>Add Item</h2>
          <form onSubmit={handleSearchSubmit} className="invoice">
            <div className="input_field">
              <label htmlFor="productName">From</label>
              <input
                type="date"
                className="input"
                id="from"
                name="from"
                required
              />
            </div>
            <div className="input_field">
              <label htmlFor="price">To</label>
              <input type="date" className="input" id="to" name="to" required />
            </div>
            <div className="input_field">
              <button type="submit" className="addInvoice">
                <FontAwesomeIcon icon={faSearch} /> search
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const MenuResult = ({ result }) => {
    return (
      <ul className="menu_result">
        <li className="list">
          <h4 className="list_title">No of Invoices : </h4>
          <p className="list_value">{result.length}</p>
        </li>
        <li className="list">
          <h4 className="list_title">Invoices : </h4>
        </li>
        <li className="list">
          <table className="table">
            <thead>
              <tr>
                <th className="th">invoice id</th>
                <th className="th">no of invoices</th>
                <th className="th">date</th>
                <th className="th">view</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {result.map((item, index) => (
                <tr key={index}>
                  <td className="td">{item.productId}</td>
                  <td className="td">{item.NoFProduct}</td>
                  <td className="td">{item.date}</td>
                  <td className="td">
                    <div className="action">
                      <button
                        type="button"
                        className="edit button"
                        data-id={item.productId}
                        onClick={() => setViewPopup(true)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </li>
      </ul>
    );
  };

  const handleFilter = (items, button) => {
    setResult(items);
    setChartItem(items);
    setActiveButton(button);
  };

  const ViewPopup = () => {
    return (
      <>
        <div className="popup">
          <div className="view_popup">
            <div className="inner_view">
              <h1 className="title">View #0001</h1>
              <button
                type="button"
                className="closePopup"
                onClick={() => setViewPopup(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <ul className="view_ul">
                <li className="list">
                  <h3>No of Products</h3> : 05
                </li>
                <li className="list">
                  <h3>Products :</h3>
                </li>
                <li className="list">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="th">sno</th>
                        <th className="th">product name</th>
                        <th className="th">product price</th>
                        <th className="th">product tax</th>
                        <th className="th">date time</th>
                      </tr>
                    </thead>
                    <tbody className="tbody">
                      <tr>
                        <td className="td">1</td>
                        <td className="td">product 1</td>
                        <td className="td">3000</td>
                        <td className="td">309</td>
                        <td className="td">11/11/1111</td>
                      </tr>
                      <tr>
                        <td className="td">2</td>
                        <td className="td">product 2</td>
                        <td className="td">3000</td>
                        <td className="td">309</td>
                        <td className="td">11/11/1111</td>
                      </tr>
                      <tr>
                        <td className="td">3</td>
                        <td className="td">product 3</td>
                        <td className="td">3000</td>
                        <td className="td">309</td>
                        <td className="td">11/11/1111</td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <section className="section analysis_section">
        <div className="inner_section">
          <div className={`left_chart ${fullScreen ? "active" : ""}`}>
            {fullScreen ? (
              <button
                type="button"
                className="minmax"
                onClick={() => setFullScreen(false)}
              >
                <FontAwesomeIcon icon={faMinimize} />
              </button>
            ) : (
              <button
                type="button"
                className="minmax"
                onClick={() => setFullScreen(true)}
              >
                <FontAwesomeIcon icon={faMaximize} />
              </button>
            )}
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
          <div className="left_chart">
            <div className="inner_left">
              <div className="analysis_menu">
                <div className="btns">
                  <button
                    type="button"
                    className={`analysisBtn ${
                      activeButton === "today" ? "active" : ""
                    }`}
                    onClick={() => handleFilter(todayInvoice, "today")}
                  >
                    today
                  </button>
                  <button
                    type="button"
                    className={`analysisBtn ${
                      activeButton === "week" ? "active" : ""
                    }`}
                    onClick={() => handleFilter(weekInvoice, "week")}
                  >
                    week
                  </button>
                  <button
                    type="button"
                    className={`analysisBtn ${
                      activeButton === "month" ? "active" : ""
                    }`}
                    onClick={() => handleFilter(monthInvoice, "month")}
                  >
                    month
                  </button>
                  <button
                    type="button"
                    className={`analysisBtn ${
                      activeButton === "year" ? "active" : ""
                    }`}
                    onClick={() => handleFilter(yearInvoice, "year")}
                  >
                    year
                  </button>
                  <button
                    type="button"
                    className="analysisBtn"
                    onClick={() => setshowSearch(true)}
                  >
                    <FontAwesomeIcon icon={faSearchPlus} />
                  </button>
                  <MenuResult result={result} />
                </div>
                {showSearch && <Popup />}
                {view && <ViewPopup />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Analysis;
