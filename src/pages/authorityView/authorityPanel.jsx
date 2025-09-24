import React, { useState, useEffect } from 'react';

// Simulated data to stand in for an API call
const initialRequests = [
  {
    request_id: "REQ-001",
    priority: "Critical",
    type: "Medical",
    victim_name: "John Doe",
    location: { address: "123 Maple St, Anytown" },
    status: "Unassigned",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    resources_needed: ["Ambulance", "EMT Team"]
  },
  {
    request_id: "REQ-002",
    priority: "High",
    type: "Police",
    victim_name: "Jane Smith",
    location: { address: "456 Oak Ave, Anytown" },
    status: "In Progress",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    resources_needed: ["Police Patrol", "SWAT Team"]
  },
  {
    request_id: "REQ-003",
    priority: "Medium",
    type: "Fire",
    victim_name: "Emergency Call",
    location: { address: "789 Pine Ln, Anytown" },
    status: "Fulfilled",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    resources_needed: ["Fire Truck"]
  },
  {
    request_id: "REQ-004",
    priority: "Critical",
    type: "Assault",
    victim_name: "Victim Anonymous",
    location: { address: "101 Elm Blvd, Anytown" },
    status: "Unassigned",
    timestamp: new Date().toISOString(),
    resources_needed: ["Police Patrol", "K-9 Unit"]
  },
  {
    request_id: "REQ-005",
    priority: "Low",
    type: "NGO Help",
    victim_name: "Homeless Shelter",
    location: { address: "222 Birch Rd, Anytown" },
    status: "New",
    timestamp: new Date().toISOString(),
    resources_needed: ["Food Truck", "Shelter Staff"]
  },
  {
    request_id: "REQ-006",
    priority: "Medium",
    type: "Medical",
    victim_name: "Jane Doe",
    location: { address: "111 Pine St, Anytown" },
    status: "New",
    timestamp: new Date(Date.now() - 1200000).toISOString(), // 20 minutes ago
    resources_needed: ["Ambulance"]
  },
  {
    request_id: "REQ-007",
    priority: "High",
    type: "Police",
    victim_name: "John Smith",
    location: { address: "223 Oak Rd, Anytown" },
    status: "In Progress",
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    resources_needed: ["Police Patrol"]
  },
  {
    request_id: "REQ-008",
    priority: "Critical",
    type: "Fire",
    victim_name: "Emergency Call",
    location: { address: "333 Elm Ln, Anytown" },
    status: "Unassigned",
    timestamp: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
    resources_needed: ["Fire Truck", "Rescue Ladder"]
  },
];

// Main App Component
const AuthorityPanel = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const handleAssign = (id) => {
    setRequests(
      requests.map((req) =>
        req.request_id === id ? { ...req, status: "In Progress" } : req
      )
    );
  };

  const handleFulfill = (id) => {
    setRequests(
      requests.map((req) =>
        req.request_id === id ? { ...req, status: "Fulfilled" } : req
      )
    );
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.request_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.victim_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "New" && req.status === "New") ||
      (activeTab === "Pending" && req.status === "In Progress") ||
      (activeTab === "Fulfilled" && req.status === "Fulfilled");
    return matchesSearch && matchesTab;
  });

  const criticalRequests = requests.filter((req) => req.priority === "Critical");

  const getStats = () => ({
    new: requests.filter((req) => req.status === "New").length,
    pending: requests.filter((req) => req.status === "In Progress").length,
    fulfilled: requests.filter((req) => req.status === "Fulfilled").length,
    critical: requests.filter((req) => req.priority === "Critical").length,
  });

  const timeSince = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    let interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans antialiased">
      <header className="flex justify-between items-center p-4 bg-white shadow-lg rounded-lg">
        <div className='flex gap-5'>
          <h1 className="text-2xl text-amber-950">NDRF – Delhi Zone</h1>
          <img src="/ndrf_logo_png.png" alt="NDRF Logo" className="h-10"/>
        </div>
        <div className="relative">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a2 2 0 11-4 0m4 0h-4"
              />
            </svg>
          </button>
          <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 transform translate-x-1 -translate-y-1 bg-red-600 rounded-full"></span>
        </div>
      </header>

      {/* Critical Requests Section */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-md mt-8">
        <h2 className="text-2xl font-bold text-red-700 mb-4">⚠️ Critical Alerts</h2>
        {criticalRequests.length > 0 ? (
          <ul className="space-y-4">
            {criticalRequests.map((req) => (
              <li
                key={req.request_id}
                className="bg-white p-4 rounded-md shadow-sm border border-red-100"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-gray-800">
                    ID: {req.request_id}
                  </span>
                  <span className="text-xs text-red-500 font-medium">
                    {timeSince(req.timestamp)}
                  </span>
                </div>
                <p className="text-md font-medium text-gray-900">
                  <span className="font-semibold">Resources Needed:</span> {req.resources_needed.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  Location: {req.location.address}
                </p>
                <p className="text-sm text-gray-600 font-semibold mt-1">
                  Status: {req.status}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No critical requests at the moment.
          </p>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Critical Requests", count: stats.critical, icon: "⚠️", color: "red" },
          { title: "New Requests", count: stats.new, icon: "🆕", color: "blue" },
          { title: "Pending Requests", count: stats.pending, icon: "⏳", color: "yellow" },
          { title: "Fulfilled Requests", count: stats.fulfilled, icon: "✅", color: "green" },
        ].map((card) => (
          <div
            key={card.title}
            className={`bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center cursor-pointer transition-shadow hover:shadow-lg`}
          >
            <div className={`text-5xl`}>{card.icon}</div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">{card.title}</h3>
            <p className={`mt-2 text-5xl font-bold text-${card.color}-600`}>
              {card.count}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        <div>
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-md mb-6">
            {/* Tabs */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              {["All", "New", "Pending", "Fulfilled"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Search Bar */}
            <div className="w-full md:w-1/2 relative">
              <input
                type="text"
                placeholder="Search by ID, name, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Request Table */}
          <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Victim / Issue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((req) => (
                  <tr key={req.request_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {req.request_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.victim_name} / {req.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.location.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          req.status === "Unassigned"
                            ? "bg-red-100 text-red-800"
                            : req.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {req.status === "Unassigned" && (
                        <button
                          onClick={() => handleAssign(req.request_id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Assign
                        </button>
                      )}
                      {req.status === "In Progress" && (
                        <button
                          onClick={() => handleFulfill(req.request_id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Fulfill
                        </button>
                      )}
                      <button className="text-gray-500 hover:text-gray-700">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthorityPanel;