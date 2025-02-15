import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/PropertyDetails.css";
import Navbar from "./Navbar";

const PropertyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;

  if (!property) {
    return <h2 className="error-message">No property details found</h2>;
  }

  const handleContact = () => {
    alert(`Contact Number: ${property.mobileNumber}`);
  };

  return (
    <>
    <Navbar/>
    <div className="property-details-container">
      <div className="property-content">
        
        {/* Left Column - Images */}
        <div className="property-images">
          {property.images && property.images.length > 0 ? (
            property.images.map((img, index) => (
              <img key={index} src={img} alt="Property" className="property-image" />
            ))
          ) : (
            <p className="no-image">No images available</p>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="property-info">
          <h2>{property.homeDetails}</h2>
          <p className="property-location">
            📍 {property.location?.district}, {property.location?.state} - {property.location?.pincode}
          </p>

          <div className="property-details-grid">
            <p><strong>Property Type:</strong> {property.propertyType}</p>
            <p><strong>Transaction Type:</strong> {property.transactionType}</p>
            <p><strong>Price:</strong> ₹{property.price}</p>
            <p><strong>Listed By:</strong> {property.userType}</p>
            <p><strong>Additional Notes:</strong> {property.notes || "No additional notes"}</p>
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button className="contact-button" onClick={handleContact}>📞 Contact</button>
            <button className="back-button" onClick={() => navigate(-1)}>🔙 Back</button>
          </div>
        </div>

      </div>
    </div></>
  );
};

export default PropertyDetails;
