import React, { useState } from "react";
import axios from "axios";
import "./SellerRegistration.css"; // Updated CSS file

const SellerRegistration = () => {
  const [formData, setFormData] = useState({
    userType: "",
    propertyType: "",
    transactionType: "",
    homeDetails: "",
    location: { state: "", district: "", pincode: "" },
    price: "",
    mobileNumber: "",
    notes: "",
    images: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (e) => {
    setFormData({
      ...formData,
      location: { ...formData.location, [e.target.name]: e.target.value },
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const base64Promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        if (file.size > 2 * 1024 * 1024) {
          alert("Image size should be less than 2MB");
          reject();
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
        }
      });
    });

    Promise.all(base64Promises)
      .then((base64Images) => {
        setFormData({ ...formData, images: base64Images });
      })
      .catch(() => {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    if (formData.price <= 0 || isNaN(formData.price)) {
      alert("Enter a valid price.");
      return;
    }

    const trimmedNotes = formData.notes.trim();
    const finalData = { ...formData, notes: trimmedNotes };

    try {
      const response = await axios.post("http://localhost:5000/properties", finalData);
      console.log("Success:", response.data);
      alert("Property Registered Successfully!");

      setFormData({
        userType: "",
        propertyType: "",
        transactionType: "",
        homeDetails: "",
        location: { state: "", district: "", pincode: "" },
        price: "",
        mobileNumber: "",
        notes: "",
        images: [],
      });

      document.getElementById("seller-fileInput").value = "";
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="seller-container">
      <h2 className="seller-title">Seller Registration</h2>
      <form onSubmit={handleSubmit} className="seller-form">
        <select name="userType" value={formData.userType} onChange={handleChange} className="seller-select">
          <option value="">Select User Type</option>
          <option value="Owner">Owner</option>
          <option value="Agent">Agent</option>
          <option value="Builder">Builder</option>
        </select>

        <select name="transactionType" value={formData.transactionType} onChange={handleChange} className="seller-select">
          <option value="">Select Transaction Type</option>
          <option value="Sale">Sale</option>
          <option value="Rent">Rent</option>
          <option value="Lease">Lease</option>
        </select>

        <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="seller-select">
          <option value="">Select Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Home">Home</option>
        </select>

        <select name="homeDetails" value={formData.homeDetails} onChange={handleChange} className="seller-select">
          <option value="">Select BHK Type</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
        </select>

        <div className="seller-grid-container">
          <input type="text" name="state" placeholder="State" value={formData.location.state} onChange={handleLocationChange} className="seller-input" />
          <input type="text" name="district" placeholder="District" value={formData.location.district} onChange={handleLocationChange} className="seller-input" />
          <input type="text" name="pincode" placeholder="Pincode" value={formData.location.pincode} onChange={handleLocationChange} className="seller-input" />
        </div>

        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="seller-input" />

        <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} className="seller-input" required />

        <textarea name="notes" placeholder="Additional Notes" value={formData.notes} onChange={handleChange} className="seller-textarea"></textarea>

        <input type="file" id="seller-fileInput" multiple onChange={handleImageUpload} className="seller-file-input" />

        <button type="submit" className="seller-button">Submit</button>
      </form>
    </div>
  );
};

export default SellerRegistration;
