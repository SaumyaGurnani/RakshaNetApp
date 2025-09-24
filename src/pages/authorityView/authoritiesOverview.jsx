// src/pages/authorityView/authoritiesOverview.jsx

import React from 'react';
import { FiUsers, FiMapPin, FiActivity } from 'react-icons/fi';

// --- Imaginary Data for All Authorities ---
const allUnitsData = [
  { id: 'NDRF Unit 7B', area: 'Rohini, Delhi', status: 'Active', onOperation: 'Urban Flood Rescue (OP-452)', personnel: 32 },
  { id: 'NDRF Unit 2A', area: 'Ghaziabad, UP', status: 'Active', onOperation: 'Building Collapse (OP-453)', personnel: 28 },
  { id: 'SDRF Unit 5C', area: 'Gurugram, HR', status: 'Standby', onOperation: 'N/A', personnel: 30 },
  { id: 'NDRF Unit 3D', area: 'Faridabad, HR', status: 'Active', onOperation: 'Chemical Spill (OP-449)', personnel: 25 },
  { id: 'ODRAF Team 3', area: 'Puri, Odisha', status: 'Active', onOperation: 'Cyclone Amphan (OP-451)', personnel: 45 },
  { id: 'Civil Defence', area: 'Noida, UP', status: 'Standby', onOperation: 'N/A', personnel: 50 },
];

const getStatusClass = (status) => {
  return status === 'Active' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
};

export default function AuthorityOverview() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">All Authorities Overview</h1>
      
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-3 px-4">Unit ID</th>
                <th className="py-3 px-4">Operating Area</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">Assigned Operation</th>
                <th className="py-3 px-4 text-center">Personnel</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allUnitsData.map((unit) => (
                <tr key={unit.id} className="text-slate-700 hover:bg-slate-50">
                  <td className="py-4 px-4 font-medium text-slate-800">{unit.id}</td>
                  <td className="py-4 px-4">{unit.area}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusClass(unit.status)}`}>
                      {unit.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">{unit.onOperation}</td>
                  <td className="py-4 px-4 text-center font-semibold">{unit.personnel}</td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:underline">Contact</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}