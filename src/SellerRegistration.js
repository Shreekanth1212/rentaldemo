import React, { useState } from "react";
import axios from "axios";
import "./SellerRegistration.css"; // Import CSS file

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

    // Validate mobile number
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    // Validate price (positive number)
    if (formData.price <= 0 || isNaN(formData.price)) {
      alert("Enter a valid price.");
      return;
    }

    // Trim notes input
    const trimmedNotes = formData.notes.trim();

    const finalData = { ...formData, notes: trimmedNotes };

    try {
      const response = await axios.post("http://localhost:5000/properties", finalData);
      console.log("Success:", response.data);
      alert("Property Registered Successfully!");

      // Clear form after submission
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

      // Reset file input
      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <h2>Seller Registration</h2>
      <form onSubmit={handleSubmit}>
        <select name="userType" value={formData.userType} onChange={handleChange}>
          <option value="">Select User Type</option>
          <option value="Owner">Owner</option>
          <option value="Agent">Agent</option>
          <option value="Builder">Builder</option>
        </select>

        <select name="transactionType" value={formData.transactionType} onChange={handleChange}>
          <option value="">Select Transaction Type</option>
          <option value="Sale">Sale</option>
          <option value="Rent">Rent</option>
          <option value="Lease">Lease</option>
        </select>

        <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
          <option value="">Select Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Home">Home</option>
        </select>

        <select name="homeDetails" value={formData.homeDetails} onChange={handleChange}>
          <option value="">Select BHK Type</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
        </select>

        <div className="grid-container">
          <input type="text" name="state" placeholder="State" value={formData.location.state} onChange={handleLocationChange} />
          <input type="text" name="district" placeholder="District" value={formData.location.district} onChange={handleLocationChange} />
          <input type="text" name="pincode" placeholder="Pincode" value={formData.location.pincode} onChange={handleLocationChange} />
        </div>

        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />

        <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />

        <textarea name="notes" placeholder="Additional Notes" value={formData.notes} onChange={handleChange}></textarea>

        <input type="file" id="fileInput" multiple onChange={handleImageUpload} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SellerRegistration;
