import { useEffect, useState } from "react";
import axios from "axios";
import HouseRegistration from "./HouseRegistration";
import SellerRegistration from "./SellerRegistration";
import BuyerPage from "./BuyerPage";

function App() {
  const [houses, setHouses] = useState([]); // Declare houses state

  useEffect(() => {
    axios.get("http://localhost:5000/properties")
      .then((response) => setHouses(response.data))
      .catch((error) => console.error("Error fetching houses:", error));
  }, []);





  
  return (
    <div>
    <SellerRegistration/>
     <BuyerPage/>
   
   
    </div>
  );
}

export default App;
