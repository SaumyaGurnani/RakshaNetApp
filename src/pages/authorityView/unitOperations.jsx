// src/pages/authorityView/UnitOperations.jsx

import React from 'react';
import { FiActivity, FiShield, FiTruck, FiUsers } from 'react-icons/fi';

// --- Imaginary Data ---
const activeOperations = [
  {
    opId: 'OP-452',
    name: 'Urban Flood Rescue',
    location: 'Rohini, Sector 24, Delhi',
    objective: 'Evacuate 50+ stranded residents from flooded residential areas using inflatable boats.',
    personnel: 16,
    equipment: ['2 Inflatable Boats', 'Life Jackets', 'First-Aid Kits', 'Search Lights'],
  },
  {
    opId: 'OP-455',
    name: 'Medical Supply Chain',
    location: 'Karol Bagh Market',
    objective: 'Establish a secure corridor for emergency medical supplies to reach the field hospital.',
    personnel: 8,
    equipment: ['Medical Supply Truck', 'Communication Sets'],
  }
];

export default function UnitOperations() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Unit Operations (NDRF Unit 7B)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {activeOperations.map(op => (
            <div key={op.opId} className="bg-white p-6 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">ACTIVE OPERATION</span>
              <h2 className="text-xl font-bold text-slate-800 mt-3">{op.name} ({op.opId})</h2>
              <p className="text-sm text-slate-600 mt-1">{op.location}</p>
              
              <p className="text-sm text-slate-800 bg-slate-50 p-4 rounded-lg mt-4">{op.objective}</p>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold text-slate-700 flex items-center gap-2"><FiUsers /> Personnel Assigned</h3>
                  <p className="text-slate-600 pl-6">{op.personnel} members</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700 flex items-center gap-2"><FiTruck /> Equipment Deployed</h3>
                  <ul className="list-disc pl-10 text-slate-600">
                    {op.equipment.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2"><FiShield /> Unit 7B Status</h2>
          <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-600">Total Personnel:</span><span className="font-semibold text-slate-800">32</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Currently Deployed:</span><span className="font-semibold text-red-600">24</span></div>
              <div className="flex justify-between"><span className="text-slate-600">On Standby:</span><span className="font-semibold text-green-600">8</span></div>
              <hr className="my-2"/>
              <div className="flex justify-between"><span className="text-slate-600">Equipment:</span><span className="font-semibold text-green-600">All Systems Nominal</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Current Status:</span><span className="font-semibold text-red-600">Active Operation</span></div>
          </div>
        </div>

      </div>
    </div>
  );
}