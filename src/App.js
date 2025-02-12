
import SellerRegistration from "./SellerRegistration";
import BuyerPage from "./BuyerPage";
import { Routes, Route, Navigate } from 'react-router-dom'; // No need for BrowserRouter here
import Login from './Login';
import Signup from './Signup';
import AgentPage from "./AgentPage";
import Profile from "./Profile";

import PrivateRoute from "./PrivateRoute"; // Import Private Route




function App() {
  return (
 
      <Routes>
         {/* Public Routes */}
         <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/buyer" element={<PrivateRoute><BuyerPage /></PrivateRoute>} />
        <Route path="/seller" element={<PrivateRoute><SellerRegistration /></PrivateRoute>} />
        <Route path="/agent" element={<PrivateRoute><AgentPage /></PrivateRoute>} />

        {/* Redirect to Login if no matching route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      
  );
}

export default App;