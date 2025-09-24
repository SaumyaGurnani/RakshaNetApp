// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Import your landing page component
import App from './App.jsx';

// Import the Authority section's layout and pages
import AuthorityLayout from './pages/authorityView/Layout.jsx';
import AuthorityDashboard from './pages/authorityView/dashboard.jsx';
import AuthorityLiveUpdates from './pages/authorityView/liveupdates.jsx';
import AuthorityAnalytics from './pages/authorityView/Analytics.jsx';
import AuthorityMapView from './pages/authorityView/mapView.jsx';
import AuthorityOngoingOps from './pages/authorityView/ongoingOperations.jsx';
import AuthorityOverview from './pages/authorityView/authoritiesOverview.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route 1: The public landing page at "/" */}
        <Route path="/" element={<App />} />

        {/* Route 2: The entire authority section, nested under "/authority" */}
        <Route path="/authority" element={<AuthorityLayout />}>
          <Route index element={<AuthorityDashboard />} />
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