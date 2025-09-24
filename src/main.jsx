// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import SOSPage from './pages/SOSPage.jsx';
import AuthorityLayout from './pages/authorityView/Layout.jsx';
import HomeDashboard from './pages/authorityView/HomeDashboard.jsx';

import AuthorityAnalytics from './pages/authorityView/Analytics.jsx';
import AuthorityMapView from './pages/authorityView/mapView.jsx';
import AuthorityOngoingOps from './pages/authorityView/ongoingOperations.jsx';
import AuthorityOverview from './pages/authorityView/authoritiesOverview.jsx';
import AuthorityPanel from './pages/authorityView/authorityPanel.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sos" element={<SOSPage />} />
        <Route path="/authority" element={<AuthorityLayout />}>
          <Route index element={<HomeDashboard />} />
          <Route path="authority-panel" element={<AuthorityPanel />} />
         
          <Route path="analytics" element={<AuthorityAnalytics />} />
          <Route path="map-view" element={<AuthorityMapView />} />
          <Route path="ongoing-ops" element={<AuthorityOngoingOps />} />
          <Route path="authority-overview" element={<AuthorityOverview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);