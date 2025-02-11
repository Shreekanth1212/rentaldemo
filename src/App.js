
import SellerRegistration from "./SellerRegistration";
import BuyerPage from "./BuyerPage";
import { Routes, Route } from 'react-router-dom'; // No need for BrowserRouter here
import Login from './Login';
import Signup from './Signup';
import AgentPage from "./AgentPage";
import Profile from "./Profile";
import Logout from "./Logout";




function App() {
  return (
  
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/buyer" element={<BuyerPage />} />
        <Route path="/seller" element={<SellerRegistration />} />
        <Route path="/agent" element={<AgentPage />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
 
  );
}

export default App;