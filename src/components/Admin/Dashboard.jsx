import React from 'react';
import { 
  BarChart3, 
  Users, 
  Building, 
  UtensilsCrossed, 
  BookOpen, 
  ShoppingCart, 
  MapPin, 
  UserCheck, 
  GraduationCap, 
  TrendingUp,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  // Dummy data for dashboard stats
  const stats = {
    totalHostels: 42,
    totalStudents: 1248,
    totalColleges: 15,
    totalGuides: 89,
    totalMentors: 34,
    totalBooks: 892,
    totalGroceryItems: 234,
    totalFoodVendors: 28
  };

  // Recent activities data
  const recentActivities = [
    { id: 1, type: 'hostel', action: 'New hostel added', name: 'Pearl Girls Accommodation', time: '2 hours ago' },
    { id: 2, type: 'guide', action: 'New guide published', name: 'Engineering College Guide', time: '4 hours ago' },
    { id: 3, type: 'food', action: 'Food vendor registered', name: 'Tasty Bites Canteen', time: '6 hours ago' },
    { id: 4, type: 'mentor', action: 'New mentor joined', name: 'Dr. Priya Patel', time: '8 hours ago' },
    { id: 5, type: 'books', action: 'Book added to library', name: 'Engineering Mathematics', time: '1 day ago' }
  ];

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-500 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-sm">{change}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityColor = (type) => {
      const colors = {
        hostel: 'bg-blue-500',
        guide: 'bg-orange-500',
        food: 'bg-green-500',
        mentor: 'bg-purple-500',
        books: 'bg-yellow-500'
      };
      return colors[type] || 'bg-gray-500';
    };

    return (
      <div className="flex items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)} mr-3`}></div>
        <div className="flex-1">
          <p className="text-white font-medium">{activity.action}</p>
          <p className="text-gray-400 text-sm">{activity.name}</p>
        </div>
        <span className="text-gray-400 text-xs">{activity.time}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your platform.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Hostels"
          value={stats.totalHostels}
          icon={Building}
          color="bg-blue-500"
          change={12}
        />
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          icon={Users}
          color="bg-green-500"
          change={8}
        />
        <StatCard
          title="Total Colleges"
          value={stats.totalColleges}
          icon={GraduationCap}
          color="bg-purple-500"
          change={5}
        />
        <StatCard
          title="Total Guides"
          value={stats.totalGuides}
          icon={MapPin}
          color="bg-orange-500"
          change={15}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Mentors"
          value={stats.totalMentors}
          icon={UserCheck}
          color="bg-yellow-500"
          change={3}
        />
        <StatCard
          title="Books Available"
          value={stats.totalBooks}
          icon={BookOpen}
          color="bg-indigo-500"
        />
        <StatCard
          title="Grocery Items"
          value={stats.totalGroceryItems}
          icon={ShoppingCart}
          color="bg-pink-500"
          change={20}
        />
        <StatCard
          title="Food Vendors"
          value={stats.totalFoodVendors}
          icon={UtensilsCrossed}
          color="bg-cyan-500"
          change={7}
        />
      </div>

      {/* Recent Activities */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
          <button className="text-yellow-500 hover:text-yellow-400 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
            <Plus className="w-5 h-5 text-yellow-500" />
            <span>Add New Guide</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
            <Building className="w-5 h-5 text-blue-500" />
            <span>Add New Hostel</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
            <UserCheck className="w-5 h-5 text-green-500" />
            <span>Add New Mentor</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
            <ShoppingCart className="w-5 h-5 text-pink-500" />
            <span>Add Grocery Item</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;