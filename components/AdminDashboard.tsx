import React, { useState } from 'react';
import { Search, Users, Package, BarChart2, LogOut } from 'lucide-react';
import { Gender } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

// Mock data for search functionality
const MOCK_USERS = [
  { username: 'alice_style', gender: Gender.FEMALE, email: 'alice@example.com' },
  { username: 'bob_fashion', gender: Gender.MALE, email: 'bob@example.com' },
  { username: 'charlie_chic', gender: Gender.OTHER, email: 'charlie@example.com' },
  { username: 'david_design', gender: Gender.MALE, email: 'david@example.com' },
  { username: 'eve_elegant', gender: Gender.FEMALE, email: 'eve@example.com' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(MOCK_USERS);

  const handleSearch = () => {
    const filtered = MOCK_USERS.filter(u => 
      u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filtered);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      {/* Sidebar - Dark Mode */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-wider">ADMIN PANEL</h1>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-900/30 text-blue-400 rounded-lg border border-blue-900/50">
            <Users size={20} />
            <span className="font-medium">User Management</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Package size={20} />
            <span className="font-medium">Product Management</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <BarChart2 size={20} />
            <span className="font-medium">Statistics</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-950/20 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-slate-900">Admin Dashboard</h2>
            <div className="text-sm text-slate-500">Welcome, Admin</div>
          </div>

          {/* Search Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Search Users</h3>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <input 
                  type="text"
                  placeholder="Search by Username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              </div>
              <button 
                onClick={handleSearch}
                className="px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
              >
                Search
              </button>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 font-semibold text-slate-700">Username</th>
                    <th className="p-4 font-semibold text-slate-700">Gender</th>
                    <th className="p-4 font-semibold text-slate-700">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.length > 0 ? (
                    users.map((user, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-slate-800 font-medium">{user.username}</td>
                        <td className="p-4 text-slate-600">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.gender === Gender.FEMALE ? 'bg-pink-100 text-pink-800' :
                            user.gender === Gender.MALE ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {user.gender}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">{user.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-slate-400">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};