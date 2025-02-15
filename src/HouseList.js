import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/HouseList.css";

const HouseList = ({ properties }) => {
  const navigate = useNavigate();

  const handleViewDetails = (property) => {
    navigate(`/property/${property.id}`, { state: { property } });
  };

  return (
    <div className="home-list-wrapper">
      <h2 className="home-list-title">Featured Properties</h2>

      {properties.length === 0 ? (
        <p className="no-results">No properties found. Try different filters.</p>
      ) : (
        <div className="home-grid">
          {properties.map((property) => (
            <div key={property.id} className="home-card">
              <img src={property.images} alt={property.name} className="home-image" />
              <div className="home-details">
                <h3 className="home-name">{property.name}</h3>

                {/* Location Display */}
                <p className="home-location">
                  <i className="fa fa-map-marker"></i> 
                  {property.location?.district}, {property.location?.state} - {property.location?.pincode}
                </p>

                <p className="home-type"><strong>Type:</strong> {property.propertyType}</p>
                <p className="home-price"><strong>Price:</strong> ₹{property.price}</p>

                {/* View Details Button */}
                <button className="view-details" onClick={() => handleViewDetails(property)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HouseList;
