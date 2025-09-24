// src/pages/authorityView/Dashboard.jsx

import React, { useState } from "react";
import StatsCards from "../../components/StatsCards";

const myAuthorityData = [
  { id: "R-7781", status: "Pending", priority: "High", area: "Sector 15" },
  { id: "R-7780", status: "In Progress", priority: "High", area: "Sector 12" },
  { id: "R-7779", status: "Completed", priority: "Medium", area: "Sector 15" },
];

const allAuthoritiesData = [
  { id: "R-7781", status: "Pending", priority: "High", area: "Sector 15 (Unit 7B)" },
  { id: "A-5412", status: "Pending", priority: "High", area: "Rohini (Unit 2A)" },
  { id: "R-7780", status: "In Progress", priority: "High", area: "Sector 12 (Unit 7B)" },
  { id: "C-9871", status: "Completed", priority: "Low", area: "Dwarka (Unit 5C)" },
  { id: "B-1123", status: "In Progress", priority: "Medium", area: "Karol Bagh (Unit 3D)" },
  { id: "R-7779", status: "Completed", priority: "Medium", area: "Sector 15 (Unit 7B)" },
];

export default function HomeDashboard() {
  const [activeTable, setActiveTable] = useState('my');

  return (
    <>
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Welcome, NDRF Unit 7B</h2>
        <StatsCards />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTable('my')}
                className={`text-sm transition-colors cursor-pointer ${
                  activeTable === 'my' ? 'font-medium text-slate-800' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                My Authority
              </button>
              <button
                onClick={() => setActiveTable('all')}
                className={`text-sm transition-colors cursor-pointer ${
                  activeTable === 'all' ? 'font-medium text-slate-800' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                All Authorities
              </button>
            </div>
            <button className="text-sm text-slate-500">Filters</button>
          </div>
          <div className="px-5 py-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="py-2">ID</th>
                    <th className="py-2">STATUS</th>
                    <th className="py-2">PRIORITY</th>
                    <th className="py-2">AREA</th>
                    <th className="py-2">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(activeTable === 'my' ? myAuthorityData : allAuthoritiesData).map((row) => (
                    <tr key={row.id} className="text-slate-700">
                      <td className="py-3">{row.id}</td>
                      <td className="py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          row.status === "Pending" ? "bg-yellow-100 text-yellow-700"
                          : row.status === "In Progress" ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                        }`}>{row.status}</span>
                      </td>
                      <td className="py-3 font-medium text-red-600">{row.priority}</td>
                      <td className="py-3">{row.area}</td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:underline">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="font-semibold text-slate-900 mb-3">Live Operations & Alerts</div>
          <div className="space-y-4">
            {[
              { title: "Building Collapse Reported", time: "2 min ago", badge: "Assign", color: "text-red-600" },
              { title: "Operation R-7780 In Progress", time: "5 min ago", badge: "Assign", color: "text-blue-600" },
              { title: "Heavy Rainfall Warning", time: "15 min ago", badge: "Assign", color: "text-slate-600" },
            ].map((a, idx) => (
              <div key={idx} className="flex items-start justify-between">
                <div>
                  <div className={`text-sm font-medium ${a.color}`}>{a.title}</div>
                  <div className="text-xs text-slate-500">Multiple casualties feared.</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs px-2.5 py-1 rounded border border-slate-300">{a.badge}</button>
                  <button className="text-xs px-2.5 py-1 rounded border border-slate-300">Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}