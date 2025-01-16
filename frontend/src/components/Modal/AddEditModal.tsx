import React, { useState, useEffect } from "react";
import "./AddEditModal.css";

const AddEditModal = ({ isEdit, isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
  });

  // Populate form data when popup opens with the passed `data`
  useEffect(() => {
    if (isOpen && isEdit && data) {
      setFormData(data); // Populate formData for editing
    } else {
      setFormData({
        title: "",
        description: "",
        location: "",
        image: "",
      }); // Reset formData for adding a new item
    }
  }, [isOpen, isEdit, data]);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle save on add and edit
  const handleSave = () => {
    onSave(formData); // Pass updated form data back to the parent
    onClose(); // Close the popup
  };

  if (!isOpen) return null;

  return (
    <div className="popupOverlay">
      <div className="popup">
        <div className="popupHeader">
          <h2>{isEdit ? "Edit Information" : "Add Information"}</h2>
          <button onClick={onClose} className="closeBtn">
            &times;
          </button>
        </div>
        <div className="popupBody">
          <form>
            <div className="formGroup">
              <label className="popupText">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label className="popupText">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label className="popupText">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label className="popupText">Image URL:</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <div className="popupFooter">
          <button onClick={handleSave} className="okBtn">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditModal;
