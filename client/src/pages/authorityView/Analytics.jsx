// src/pages/authorityView/Analytics.jsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FiClock, FiUsers, FiClipboard, FiAlertTriangle } from 'react-icons/fi';

// --- Imaginary Data for Charts (remains the same) ---
const requestTypeData = [
  { name: 'Medical', value: 400 },
  { name: 'Rescue', value: 300 },
  { name: 'Food/Water', value: 300 },
  { name: 'Infrastructure', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const weeklyTrendData = [
  { day: 'Mon', requests: 30, fulfilled: 25 },
  { day: 'Tue', requests: 45, fulfilled: 40 },
  { day: 'Wed', requests: 60, fulfilled: 52 },
  { day: 'Thu', requests: 50, fulfilled: 45 },
  { day: 'Fri', requests: 75, fulfilled: 68 },
  { day: 'Sat', requests: 90, fulfilled: 85 },
  { day: 'Sun', requests: 110, fulfilled: 100 },
];

const unitPerformanceData = [
    { unit: 'Unit 7B', avgTime: 25, fulfilled: 150 },
    { unit: 'Unit 2A', avgTime: 35, fulfilled: 120 },
    { unit: 'Unit 5C', avgTime: 28, fulfilled: 180 },
    { unit: 'Unit 3D', avgTime: 45, fulfilled: 95 },
];

const kpiData = [
    { title: 'Avg. Response Time', value: '28 min', icon: <FiClock/>, color: 'text-blue-500' },
    { title: 'Total Personnel Deployed', value: '112', icon: <FiUsers/>, color: 'text-green-500' },
    { title: 'Open High-Priority Cases', value: '18', icon: <FiAlertTriangle/>, color: 'text-red-500' },
    { title: 'Total Operations Logged', value: '287', icon: <FiClipboard/>, color: 'text-yellow-500' },
];

// --- NEW CUSTOM LABEL FUNCTION ---
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.25; // Position label outside the pie
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#333" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={14}>
      <tspan x={x} dy="-0.5em">{name}</tspan>
      <tspan x={x} dy="1.2em" fill="#666" fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </tspan>
    </text>
  );
};


export default function AuthorityAnalytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Reports & Analytics</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map(kpi => (
            <div key={kpi.title} className="bg-white p-5 rounded-xl border border-slate-200 flex items-center gap-4">
                <div className={`text-3xl ${kpi.color}`}>{kpi.icon}</div>
                <div>
                    <p className="text-slate-500 text-sm">{kpi.title}</p>
                    <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Request Types Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">Request Types Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
              {/* UPDATED PIE COMPONENT */}
              <Pie 
                data={requestTypeData} 
                cx="50%" 
                cy="50%" 
                labelLine={false} // Hide the default line
                label={renderCustomizedLabel} // Use our custom label function
                outerRadius={100} 
                fill="#8884d8" 
                dataKey="value"
              >
                {requestTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Trend Line Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">Weekly Request Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="requests" stroke="#8884d8" name="New Requests" />
              <Line type="monotone" dataKey="fulfilled" stroke="#82ca9d" name="Fulfilled" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Unit Performance Bar Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">Unit Performance Metrics</h2>
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={unitPerformanceData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="unit" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgTime" fill="#8884d8" name="Avg. Response Time (min)" />
                <Bar dataKey="fulfilled" fill="#82ca9d" name="Requests Fulfilled" />
            </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}