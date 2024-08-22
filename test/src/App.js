import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CampaignPage from "./components/CampaignDashboard";
import Error404 from "./Pages/Error404";
import IndexPage from "./Pages/Index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/campaigns/:cid" element={<CampaignPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
