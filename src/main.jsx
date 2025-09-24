// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import AuthorityLayout from './pages/authorityView/Layout.jsx';
import HomeDashboard from './pages/authorityView/HomeDashboard.jsx'; // 1. Import HomeDashboard
import UnitDashboard from './pages/authorityView/UnitDashboard.jsx';   // 2. Import UnitDashboard
import AuthorityLiveUpdates from './pages/authorityView/liveupdates.jsx';
import AuthorityAnalytics from './pages/authorityView/Analytics.jsx';
import AuthorityMapView from './pages/authorityView/mapView.jsx';
import AuthorityOngoingOps from './pages/authorityView/ongoingOperations.jsx';
import AuthorityOverview from './pages/authorityView/authoritiesOverview.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authority" element={<AuthorityLayout />}>
          {/* 3. The index route is now the HomeDashboard */}
          <Route index element={<HomeDashboard />} /> 
          {/* 4. Add the new route for the UnitDashboard */}
          <Route path="unit-dashboard" element={<UnitDashboard />} /> 
          <Route path="live-updates" element={<AuthorityLiveUpdates />} />
          <Route path="analytics" element={<AuthorityAnalytics />} />
          <Route path="map-view" element={<AuthorityMapView />} />
          <Route path="ongoing-ops" element={<AuthorityOngoingOps />} />
          <Route path="authority-overview" element={<AuthorityOverview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);