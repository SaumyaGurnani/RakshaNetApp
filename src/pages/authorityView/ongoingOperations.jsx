// src/pages/authorityView/ongoingOperations.jsx

import React from 'react';
import { FiMapPin, FiUsers, FiChevronsRight } from 'react-icons/fi';

// --- Imaginary Data for Ongoing Operations ---
const operations = [
  {
    id: 'OP-451',
    title: 'Cyclone Amphan - Coastal Evacuation',
    area: 'Puri, Odisha',
    status: 'Active',
    assignedUnits: ['NDRF Unit A', 'ODRAF Team 3', 'Medical Corps'],
    severity: 'Critical',
    lastUpdate: 'Evacuation of 5,000+ people from coastal villages in progress. Temporary shelters are at 80% capacity.',
    updatedAt: '15 mins ago'
  },
  {
    id: 'OP-452',
    title: 'Urban Flood Rescue',
    area: 'Rohini, Sector 24, Delhi',
    status: 'Active',
    assignedUnits: ['NDRF Unit 7B', 'Delhi Fire Service'],
    severity: 'High',
    lastUpdate: 'Water rescue teams deployed. Using inflatable boats to reach stranded residents.',
    updatedAt: '45 mins ago'
  },
  {
    id: 'OP-450',
    title: 'Landslide Debris Removal',
    area: 'Chamoli, Uttarakhand',
    status: 'Contained',
    assignedUnits: ['NDRF Unit C', 'Border Roads Org.'],
    severity: 'Medium',
    lastUpdate: 'Major roadways cleared. Search for missing persons is ongoing.',
    updatedAt: '3 hours ago'
  },
];

const getSeverityClass = (severity) => {
  switch (severity) {
    case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
    case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    default: return 'bg-blue-100 text-blue-800 border-blue-300';
  }
};

export default function AuthorityOngoingOps() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Ongoing Operations</h1>

      <div className="space-y-4">
        {operations.map(op => (
          <div key={op.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <div>
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getSeverityClass(op.severity)}`}>
                  {op.severity}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">{op.title}</h2>
              </div>
              <div className="text-sm text-slate-500 mt-2 sm:mt-0 sm:text-right">
                Last updated: {op.updatedAt}
              </div>
            </div>

            <div className="mt-4 border-t border-slate-200 pt-4 space-y-3">
              <div className="flex items-center text-slate-600">
                <FiMapPin className="mr-2 h-4 w-4" />
                <span className="font-semibold mr-2">Location:</span> {op.area}
              </div>
              <div className="flex items-center text-slate-600">
                <FiUsers className="mr-2 h-4 w-4" />
                <span className="font-semibold mr-2">Assigned Units:</span> {op.assignedUnits.join(', ')}
              </div>
              <p className="text-sm text-slate-800 bg-slate-50 p-3 rounded-lg">{op.lastUpdate}</p>
            </div>
            
            <div className="mt-4 text-right">
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                View Full Details <FiChevronsRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}