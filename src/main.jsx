// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import AuthorityLayout from './pages/authorityView/Layout.jsx';
import AuthorityDashboard from './pages/authorityView/HomeDashboard.jsx';
import AuthorityAnalytics from './pages/authorityView/Analytics.jsx';
import AuthorityMapView from './pages/authorityView/mapView.jsx';
import AuthorityOngoingOps from './pages/authorityView/ongoingOperations.jsx';
import AuthorityOverview from './pages/authorityView/authoritiesOverview.jsx';
import AuthorityPanel from './pages/authorityView/authorityPanel.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authority" element={<AuthorityLayout />}>
          <Route index element={<AuthorityDashboard />} />
          <Route path="authority-panel" element={<AuthorityPanel />} />
          <Route path="analytics" element={<AuthorityAnalytics />} />
          <Route path="map-view" element={<AuthorityMapView />} />
          <Route path="ongoing-ops" element={<AuthorityOngoingOps />} />
          <Route path="authority-overview" element={<AuthorityOverview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);