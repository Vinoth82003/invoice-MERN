import React, { useState, useContext, useRef } from "react";
import "../css/invoice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrashAlt,
  faPrint,
  faCut,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../App"; // Import the context
import { useReactToPrint } from "react-to-print";

const Invoice = () => {
  const { items, setItems } = useContext(AppContext); // Consume the context
  const componentRef = useRef();

  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    price: "",
    tax: "",
  });

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update existing item
      const updatedItems = items.map((item) =>
        item.id === formData.id
          ? {
              ...item,
              productName: formData.productName,
              price: parseInt(formData.price), // Parse price as integer
              tax: parseInt(formData.tax), // Parse tax as integer
            }
          : item
      );
      setItems(updatedItems);
      setShowEditPopup(false);
    } else {
      // Add new item
      const newItem = {
        id: items.length + 1,
        productName: formData.productName,
        price: parseInt(formData.price),
        tax: parseInt(formData.tax),
        dateTime: new Date().toLocaleString(),
      };
      setItems([...items, newItem]);
      setShowAddPopup(false);
    }
    setFormData({ id: "", productName: "", price: "", tax: "" });
  };

  const handleEditItem = (id) => {
    const selectedItem = items.find((item) => item.id === id);
    setFormData(selectedItem);
    setShowEditPopup(true);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const formatAmount = (amount) => {
    return parseFloat(amount); // Parse the amount without formatting
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <section className="invoice_section section">
      <div className="invoice_form print">
        <h1 className="add_item">Add to Invoice</h1>
        <div className="invoice_buttons">
          <button onClick={() => setShowAddPopup(true)} className="addInvoice">
            <FontAwesomeIcon icon={faPlus} />
            Add Item
          </button>
          <button className="addInvoice" onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} />
            Print
          </button>
        </div>
      </div>
      <div className="printTable" ref={componentRef}>
        <div className="invoice_table">
          <table className="table">
            <thead>
              <tr className="row">
                <div className="th">sno</div>
                <div className="th">product name</div>
                <div className="th">product price</div>
                <div className="th">product tax</div>
                <div className="th">date time</div>
                <div className="th print">action</div>
              </tr>
            </thead>
            <tbody className="table_body">
              {items.map((item, index) => (
                <tr className="row" key={item.id}>
                  <div className="td">{index + 1}</div>
                  <div className="td">{item.productName}</div>
                  <div className="td right">
                    {formatAmount(item.price).toLocaleString("en-IN")}
                  </div>
                  <div className="td">
                    {formatAmount(item.tax).toLocaleString("en-IN")}
                  </div>
                  <div className="td">{item.dateTime}</div>
                  <div className="td print">
                    <div className="action">
                      <button
                        type="button"
                        className="edit button"
                        onClick={() => handleEditItem(item.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        edit
                      </button>
                      <button
                        type="button"
                        className="remove button"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                        remove
                      </button>
                    </div>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total_box">
            <ul className="total">
              <li className="subTotal list">
                <h4 className="list_title">
                  Sub Total : Rs{" "}
                  <span className="value">
                    {formatAmount(
                      items.reduce((acc, item) => acc + item.price, 0)
                    ).toLocaleString("en-IN")}
                  </span>
                </h4>
              </li>
              <li className="subTotal list">
                <h4 className="list_title">
                  Tax : Rs{" "}
                  <span className="value">
                    {formatAmount(
                      items.reduce((acc, item) => acc + item.tax, 0)
                    ).toLocaleString("en-IN")}
                  </span>
                </h4>
              </li>
              <li className="subTotal list">
                <h4 className="list_title total_amt">
                  Total : Rs{" "}
                  <span className="value">
                    {formatAmount(
                      items.reduce(
                        (acc, item) => acc + item.price + item.tax,
                        0
                      )
                    ).toLocaleString("en-IN")}
                  </span>
                </h4>
              </li>
            </ul>
          </div>
        </div>
        <div className="cutting_line">
          <div className="cut_icon">
            <FontAwesomeIcon icon={faCut} />
          </div>
        </div>
        <div className="invoice_table">
          <table className="table">
            <thead>
              <tr className="row">
                <div className="th">sno</div>
                <div className="th">product name</div>
                <div className="th">product price</div>
                <div className="th">product tax</div>
                <div className="th">date time</div>
                <div className="th print">action</div>
              </tr>
            </thead>
            <tbody className="table_body">
              {items.map((item, index) => (
                <tr className="row" key={item.id}>
                  <div className="td">{index + 1}</div>
                  <div className="td">{item.productName}</div>
                  <div className="td right">
                    {formatAmount(item.price).toLocaleString("en-IN")}
                  </div>
                  <div className="td">
                    {formatAmount(item.tax).toLocaleString("en-IN")}
                  </div>
                  <div className="td">{item.dateTime}</div>
                  <div className="td print">
                    <div className="action">
                      <button
                        type="button"
                        className="edit button"
                        onClick={() => handleEditItem(item.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        edit
                      </button>
                      <button
                        type="button"
                        className="remove button"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                        remove
                      </button>
                    </div>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total_box">
            <ul className="total">
              <li className="subTotal list">
                <h4 className="list_title">
                  Sub Total : Rs{" "}
                  <span className="value">
                    {formatAmount(
                      items.reduce((acc, item) => acc + item.price, 0)
                    ).toLocaleString("en-IN")}
                  </span>
                </h4>
              </li>
              <li className="subTotal list">
                <h4 className="list_title">
                  Tax : Rs{" "}
                  <span className="value">
                    {formatAmount(
                      items.reduce((acc, item) => acc + item.tax, 0)
                    ).toLocaleString("en-IN")}
                  </span>
                </h4>
              </li>
              <li className="subTotal list">
                <h4 className="list_title total_amt">
                  Total : Rs{" "}
                  <span className="value">
                    {formatAmount(
                      items.reduce(
                        (acc, item) => acc + item.price + item.tax,
                        0
                      )
                    ).toLocaleString("en-IN")}
                  </span>
                </h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showEditPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowEditPopup(false)}>
              &times;
            </span>
            <h2>Edit Item</h2>
            <form onSubmit={handleFormSubmit} className="invoice">
              <div className="input_field">
                <label htmlFor="productName">Product Name :</label>
                <input
                  type="text"
                  className="input"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input_field">
                <label htmlFor="price">Product Price :</label>
                <input
                  type="text"
                  className="input"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input_field">
                <label htmlFor="tax">Product Tax :</label>
                <input
                  type="text"
                  className="input"
                  id="tax"
                  name="tax"
                  value={formData.tax}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input_field">
                <button type="submit" className="addInvoice">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showAddPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowAddPopup(false)}>
              &times;
            </span>
            <h2>Add Item</h2>
            <form onSubmit={handleFormSubmit} className="invoice">
              <div className="input_field">
                <label htmlFor="productName">Product Name :</label>
                <input
                  type="text"
                  className="input"
                  id="productName"
                  name="productName"
                  placeholder="eg: product name"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input_field">
                <label htmlFor="price">Product Price :</label>
                <input
                  type="text"
                  className="input"
                  id="price"
                  name="price"
                  placeholder="eg: 500"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input_field">
                <label htmlFor="tax">Product Tax :</label>
                <input
                  type="text"
                  className="input"
                  id="tax"
                  name="tax"
                  placeholder="eg: 100"
                  value={formData.tax}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input_field">
                <button type="submit" className="addInvoice">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Invoice;
