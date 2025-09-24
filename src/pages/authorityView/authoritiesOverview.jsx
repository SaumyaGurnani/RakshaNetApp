// src/pages/authorityView/authoritiesOverview.jsx

import React from 'react';
import { FiPhone, FiSend, FiCheckCircle, FiAlertOctagon, FiUsers, FiShield } from 'react-icons/fi';

// --- Imaginary Data ---
const sosRequests = [
  { id: 'SOS-981', location: 'Rohini, Sector 24', details: 'Stranded family, requires immediate water rescue.', priority: 'Critical' },
  { id: 'SOS-980', location: 'Karol Bagh Market', details: 'Medical emergency, requires paramedic.', priority: 'High' },
];

const fulfilledRequests = [
  { id: 'R-7779', details: 'Evacuated 12 people from Sector 15.', resolvedAt: '2 hours ago' },
  { id: 'R-7772', details: 'Delivered medical supplies to Dwarka relief camp.', resolvedAt: '5 hours ago' },
];

const otherUnits = [
  { id: 'Unit 2A', area: 'Rohini', status: 'Active', personnel: 25, onOperation: true },
  { id: 'Unit 5C', area: 'Dwarka', status: 'Standby', personnel: 30, onOperation: false },
  { id: 'Unit 3D', area: 'Karol Bagh', status: 'Active', personnel: 28, onOperation: true },
];

export default function AuthorityOverview() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-slate-800">Authority Overview</h1>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: SOS and Fulfilled Requests */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active SOS Requests */}
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h2 className="text-lg font-bold text-red-600 flex items-center gap-2">
              <FiAlertOctagon />
              Active SOS Requests (Unit 7B)
            </h2>
            <div className="mt-4 space-y-4">
              {sosRequests.map(req => (
                <div key={req.id} className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-800">{req.location} <span className="text-sm font-medium text-red-700 ml-2">({req.priority})</span></p>
                    <p className="text-sm text-slate-600 mt-1">{req.details}</p>
                  </div>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                    Acknowledge
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Fulfilled Requests */}
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h2 className="text-lg font-bold text-green-600 flex items-center gap-2">
              <FiCheckCircle />
              Recently Fulfilled Requests (Unit 7B)
            </h2>
            <div className="mt-4 flow-root">
              <ul className="-my-4 divide-y divide-slate-200">
                {fulfilledRequests.map(req => (
                  <li key={req.id} className="flex items-center space-x-4 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900">{req.details}</p>
                      <p className="truncate text-sm text-slate-500">Request ID: {req.id}</p>
                    </div>
                    <div className="inline-flex items-center text-sm font-semibold text-slate-600">
                      {req.resolvedAt}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Right Column: Other Units and Unit Status */}
        <div className="space-y-6">
            
            {/* Unit Status */}
            <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2"><FiShield /> Unit 7B Status</h2>
                <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-slate-600">Personnel:</span><span className="font-semibold text-slate-800">32 / 32 Deployed</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Equipment:</span><span className="font-semibold text-green-600">All Systems Nominal</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Current Status:</span><span className="font-semibold text-red-600">Active Operation</span></div>
                </div>
            </div>

            {/* Other Authorities */}
            <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><FiUsers /> Other NDRF Units</h2>
                <div className="mt-4 space-y-3">
                {otherUnits.map(unit => (
                    <div key={unit.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                        <p className="font-bold text-slate-800">{unit.id} - {unit.area}</p>
                        <p className={`text-xs font-semibold ${unit.onOperation ? 'text-red-600' : 'text-green-600'}`}>{unit.status}</p>
                        </div>
                        <div className="flex items-center gap-2">
                        <button className="p-2 rounded-md bg-slate-200 hover:bg-slate-300 transition-colors"><FiPhone size={14} className="text-slate-700" /></button>
                        <button className="p-2 rounded-md bg-slate-200 hover:bg-slate-300 transition-colors"><FiSend size={14} className="text-slate-700" /></button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}