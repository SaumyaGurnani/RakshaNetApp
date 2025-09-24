// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import AuthorityLayout from './pages/authorityView/Layout.jsx';
import HomeDashboard from './pages/authorityView/HomeDashboard.jsx';
import UnitOperations from './pages/authorityView/UnitOperations.jsx'; // 1. Import UnitOperations
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
          <Route index element={<HomeDashboard />} />
          <Route path="unit-operations" element={<UnitOperations />} /> {/* 2. Add the new route */}
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