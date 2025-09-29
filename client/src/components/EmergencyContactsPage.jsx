import React, { useState, useMemo, useEffect } from 'react';
import { Phone, Search, LifeBuoy, HeartHandshake, Building, Home, Info } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import EmergencyMarquee from './EmergencyMarquee';

// Emergency contacts data
const emergencyContactsData = [
  { name: 'National Emergency Number', number: '112', category: 'gov', description: 'All-in-one emergency helpline for police, fire, and ambulance services.' },
  { name: 'Police', number: '100', category: 'gov', description: 'For immediate police assistance.' },
  { name: 'Fire Services', number: '101', category: 'gov', description: 'For fire-related emergencies.' },
  { name: 'Ambulance', number: '102', category: 'gov', description: 'For medical emergencies and ambulance services.' },
  { name: 'Disaster Management (NDMA)', number: '108', category: 'gov', description: 'National Disaster Management Authority helpline.' },
  { name: 'NDRF Helpline', number: '9711077372', category: 'gov', description: 'National Disaster Response Force for specialized response.' },
  { name: 'Women Helpline', number: '1091', category: 'gov', description: 'For women in distress.' },
  { name: 'Child Helpline', number: '1098', category: 'gov', description: 'For children in need of aid and assistance.' },
  { name: 'Indian Red Cross Society', number: '011-23716441', category: 'ngo', description: 'Provides medical aid and disaster relief services nationwide.' },
  { name: 'Goonj', number: '011-41401216', category: 'ngo', description: 'Focuses on clothing and essential material distribution during disasters.' },
  { name: 'HelpAge India', number: '1800-180-1253', category: 'ngo', description: 'Supports elderly citizens with shelter, healthcare, and rescue.' },
  { name: 'SEEDS India', number: '011-26198657', category: 'ngo', description: 'Works on community-based disaster response and building resilient communities.' },
  { name: 'ActionAid India', number: '1800-102-1403', category: 'ngo', description: 'Focuses on long-term relief and rehabilitation for affected communities.' },
  { name: 'CRY (Child Rights and You)', number: '022-68737200', category: 'ngo', description: 'Works to protect the rights of children, especially during emergencies.' },
];

// Emergency contact card component
const EmergencyContactCard = ({ contact, index }) => {
  const isGov = contact.category === 'gov';
  return (
    <div
      className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`p-4 flex items-center gap-4 ${isGov ? 'bg-red-50' : 'bg-blue-50'}`}>
        <div className={`p-3 rounded-full ${isGov ? 'bg-red-100' : 'bg-blue-100'}`}>
          {isGov ? <Building className="h-6 w-6 text-red-600" /> : <HeartHandshake className="h-6 w-6 text-blue-600" />}
        </div>
        <h3 className={`text-xl font-bold ${isGov ? 'text-red-800' : 'text-blue-800'}`}>{contact.name}</h3>
      </div>
      <div className="p-5">
        <p className="text-gray-600 mt-1 text-sm min-h-[60px]">{contact.description}</p>
      </div>
      <div className="px-5 pb-5 pt-2">
        <a
          href={`tel:${contact.number}`}
          className="group w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          <Phone className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          <span className="group-hover:hidden">Call: {contact.number}</span>
          <span className="hidden group-hover:block">Dial Now!</span>
        </a>
      </div>
    </div>
  );
};

export default function EmergencyContacts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isMounted, setIsMounted] = useState(false);
  const [isHindi, setIsHindi] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setIsMounted(true), []);

  const filteredContacts = useMemo(() => {
    return emergencyContactsData.filter(contact => {
      const matchesCategory = categoryFilter === 'all' || contact.category === categoryFilter;
      const matchesSearch =
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, categoryFilter]);

  const govContacts = filteredContacts.filter(c => c.category === 'gov');
  const ngoContacts = filteredContacts.filter(c => c.category === 'ngo');

  const FilterButton = ({ category, label }) => (
    <button
      onClick={() => setCategoryFilter(category)}
      className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
        categoryFilter === category ? 'bg-red-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  const content = {
    english: {
      menuItems: [
        { to: "/", icon: Home, label: "Home" },
        { to: "/alerts", icon: Phone, label: "Emergency Contacts" },
        { to: "/about", icon: Info, label: "About Us" },
      ],
      sosButton: "SOS - Emergency",
    },
    hindi: {
      menuItems: [
        { to: "/", icon: Home, label: "होम" },
        { to: "/alerts", icon: Phone, label: "आपातकालीन संपर्क" },
        { to: "/about", icon: Info, label: "हमारे बारे में" },
      ],
      sosButton: "एसओएस - आपातकाल",
    },
  };

  const current = isHindi ? content.hindi : content.english;

  const handleSosClick = () => navigate('/sos');
  const handleLogout = () => {
    setUserData(null);
    navigate('/');
  };
  const handleLanguageChange = (hindi) => setIsHindi(hindi);

  // Inject keyframes for fade-in animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fade-in 0.5s ease-out forwards;
        opacity: 0;
      }
    `;
    document.head.append(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        isHindi={isHindi}
        onLanguageChange={handleLanguageChange}
        userData={userData}
        onLogout={handleLogout}
        onShowLogin={() => navigate('/login')}
      />
      <EmergencyMarquee isHindi={isHindi} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 shadow-lg flex flex-col">
          {userData && (
            <div className="p-4 bg-blue-800 text-white border-b border-blue-700">
              <div className="text-sm opacity-90">{isHindi ? "स्वागत" : "Welcome"}</div>
              <div className="font-semibold">{userData.name || userData.email}</div>
              <div className="text-xs opacity-75 capitalize">{userData.userType}</div>
            </div>
          )}

          <div className="p-4 space-y-2">
            {current.menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={index}
                  to={item.to}
                  className={`flex items-center gap-3 p-3 rounded transition-colors w-full text-left ${
                    isActive ? "bg-sky-500 text-white" : "text-gray-200 hover:bg-blue-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={handleSosClick}
              className="w-full py-3 bg-red-700 hover:bg-red-800 rounded font-bold text-lg transition-colors text-white mt-2"
            >
              🆘 {current.sosButton}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gradient-to-br from-gray-50 to-red-50">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Search & Filter */}
            <div className="bg-white/80 backdrop-blur-lg shadow-sm rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <LifeBuoy className="h-8 w-8 text-red-600" />
                    Emergency Helplines
                  </h1>
                  <p className="text-gray-500 mt-1 text-sm">Your direct line to help in critical moments.</p>
                </div>
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-72 pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-3 mb-8 p-2 bg-gray-100 rounded-full">
              <FilterButton category="all" label="All Contacts" />
              <FilterButton category="gov" label="Government" />
              <FilterButton category="ngo" label="NGOs" />
            </div>

            {/* Contact Cards */}
            {filteredContacts.length === 0 ? (
              <div className="text-center py-20 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <LifeBuoy className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-2 text-xl font-medium text-gray-900">No Contacts Found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter.</p>
              </div>
            ) : (
              <>
                {govContacts.length > 0 && (
                  <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {govContacts.map((contact, i) => (
                      <EmergencyContactCard key={contact.number} contact={contact} index={i} />
                    ))}
                  </div>
                )}
                {ngoContacts.length > 0 && (
                  <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ngoContacts.map((contact, i) => (
                      <EmergencyContactCard key={contact.number} contact={contact} index={govContacts.length + i} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
