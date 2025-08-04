// // 








// import React, { useState } from 'react';
// import { 
//   BarChart3, 
//   Users, 
//   Building, 
//   UtensilsCrossed, 
//   BookOpen, 
//   ShoppingCart, 
//   MapPin, 
//   UserCheck, 
//   GraduationCap, 
//   LogOut,
//   Bell,
//   Search,
//   Filter,
//   Calendar,
//   TrendingUp,
//   Eye,
//   Edit,
//   Trash2,
//   Plus,
//   Menu,
//   X
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const AdminPanel = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const navigate=useNavigate();

//   // Notification data
//   const notifications = [
//     { id: 1, type: 'info', message: 'New hostel registration pending approval', time: '5 min ago', unread: true },
//     { id: 2, type: 'success', message: 'Guide "Engineering Colleges" published successfully', time: '1 hour ago', unread: true },
//     { id: 3, type: 'warning', message: 'Food vendor registration requires review', time: '2 hours ago', unread: false },
//     { id: 4, type: 'info', message: 'New mentor application received', time: '4 hours ago', unread: true },
//     { id: 5, type: 'success', message: 'Book inventory updated', time: '6 hours ago', unread: false }
//   ];

//   const unreadCount = notifications.filter(n => n.unread).length;

//   // Dummy data for dashboard stats
//   const stats = {
//     totalHostels: 42,
//     totalStudents: 1248,
//     totalColleges: 15,
//     totalGuides: 89,
//     totalMentors: 34,
//     totalBooks: 892,
//     totalGroceryItems: 234,
//     totalFoodVendors: 28
//   };

//   // Recent activities data
//   const recentActivities = [
//     { id: 1, type: 'hostel', action: 'New hostel added', name: 'Pearl Girls Accommodation', time: '2 hours ago' },
//     { id: 2, type: 'guide', action: 'New guide published', name: 'Engineering College Guide', time: '4 hours ago' },
//     { id: 3, type: 'food', action: 'Food vendor registered', name: 'Tasty Bites Canteen', time: '6 hours ago' },
//     { id: 4, type: 'mentor', action: 'New mentor joined', name: 'Dr. Priya Patel', time: '8 hours ago' },
//     { id: 5, type: 'books', action: 'Book added to library', name: 'Engineering Mathematics', time: '1 day ago' }
//   ];

//   // Navigation items
//   const navItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
//     { id: 'hostels', label: 'Hostels', icon: Building },
//     { id: 'food', label: 'Food', icon: UtensilsCrossed },
//     { id: 'books', label: 'Books', icon: BookOpen },
//     { id: 'grocery', label: 'Grocery', icon: ShoppingCart },
//     { id: 'guide', label: 'Guide', icon: MapPin },
//     { id: 'mentor', label: 'Mentor', icon: UserCheck },
//     { id: 'admission', label: 'Admission', icon: GraduationCap },
//     { id: 'users', label: 'Users', icon: Users }
//   ];

//   const StatCard = ({ title, value, icon: Icon, color, change }) => (
//     <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-500 transition-colors">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-400 text-sm font-medium">{title}</p>
//           <p className="text-2xl font-bold text-white mt-2">{value}</p>
//           {change && (
//             <div className="flex items-center mt-2">
//               <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
//               <span className="text-green-500 text-sm">{change}%</span>
//             </div>
//           )}
//         </div>
//         <div className={`p-3 rounded-lg ${color}`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//       </div>
//     </div>
//   );

//   const ActivityItem = ({ activity }) => {
//     const getActivityColor = (type) => {
//       const colors = {
//         hostel: 'bg-blue-500',
//         guide: 'bg-orange-500',
//         food: 'bg-green-500',
//         mentor: 'bg-purple-500',
//         books: 'bg-yellow-500'
//       };
//       return colors[type] || 'bg-gray-500';
//     };

//     return (
//       <div className="flex items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
//         <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)} mr-3`}></div>
//         <div className="flex-1">
//           <p className="text-white font-medium">{activity.action}</p>
//           <p className="text-gray-400 text-sm">{activity.name}</p>
//         </div>
//         <span className="text-gray-400 text-xs">{activity.time}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Header */}
//       <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="lg:hidden p-2 rounded-lg hover:bg-gray-700"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
//                 <span className="text-black font-bold text-sm">S</span>
//               </div>
//               <h1 className="text-xl font-bold">
//                 <span className="text-white">Student</span>
//                 <span className="text-yellow-500">Guide</span>
//                 <span className="text-gray-400 ml-2">Admin</span>
//               </h1>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <button
//                 onClick={() => setShowNotifications(!showNotifications)}
//                 className="relative p-2 rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 <Bell className="w-6 h-6 text-gray-400 hover:text-white" />
//                 {unreadCount > 0 && (
//                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
//                     {unreadCount}
//                   </span>
//                 )}
//               </button>
              
//               {/* Notification Dropdown */}
//               {showNotifications && (
//                 <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
//                   <div className="p-4 border-b border-gray-700">
//                     <h3 className="font-semibold text-white">Notifications</h3>
//                     <p className="text-sm text-gray-400">{unreadCount} unread notifications</p>
//                   </div>
//                   <div className="max-h-64 overflow-y-auto">
//                     {notifications.map((notification) => (
//                       <div
//                         key={notification.id}
//                         className={`p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors ${
//                           notification.unread ? 'bg-gray-750' : ''
//                         }`}
//                       >
//                         <div className="flex items-start space-x-3">
//                           <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
//                             notification.type === 'success' ? 'bg-green-500' :
//                             notification.type === 'warning' ? 'bg-yellow-500' :
//                             'bg-blue-500'
//                           }`}></div>
//                           <div className="flex-1">
//                             <p className="text-sm text-white">{notification.message}</p>
//                             <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
//                           </div>
//                           {notification.unread && (
//                             <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="p-4 border-t border-gray-700">
//                     <button className="w-full text-center text-yellow-500 hover:text-yellow-400 text-sm font-medium">
//                       Mark all as read
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
//               <span className="text-black font-bold text-sm">A</span>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
//           <div className="flex items-center justify-between p-4 lg:hidden">
//             <span className="text-lg font-semibold">Menu</span>
//             <button
//               onClick={() => setIsSidebarOpen(false)}
//               className="p-2 rounded-lg hover:bg-gray-700"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
          
//           <nav className="mt-8 px-4">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                 //   setActiveTab(item.id);
//                 navigate("/hos");
//                   setIsSidebarOpen(false);
//                 }}
//                 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                   activeTab === item.id
//                     ? 'bg-yellow-500 text-black font-medium'
//                     : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//                 }`}
//               >
//                 <item.icon className="w-5 h-5" />
//                 <span>{item.label}</span>
//               </button>
//             ))}
            
//             <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors mt-8">
//               <LogOut className="w-5 h-5" />
//               <span>Logout</span>
//             </button>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6 lg:ml-0">
//           {activeTab === 'dashboard' && (
//             <div className="space-y-6">
//               {/* Dashboard Header */}
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//                 <div>
//                   <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
//                   <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your platform.</p>
//                 </div>
//                 <div className="flex items-center space-x-4 mt-4 lg:mt-0">
//                   <div className="relative">
//                     <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                     <input
//                       type="text"
//                       placeholder="Search..."
//                       className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
//                     />
//                   </div>
//                   <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium transition-colors">
//                     Generate Report
//                   </button>
//                 </div>
//               </div>

//               {/* Stats Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <StatCard
//                   title="Total Hostels"
//                   value={stats.totalHostels}
//                   icon={Building}
//                   color="bg-blue-500"
//                   change={12}
//                 />
//                 <StatCard
//                   title="Total Students"
//                   value={stats.totalStudents.toLocaleString()}
//                   icon={Users}
//                   color="bg-green-500"
//                   change={8}
//                 />
//                 <StatCard
//                   title="Total Colleges"
//                   value={stats.totalColleges}
//                   icon={GraduationCap}
//                   color="bg-purple-500"
//                   change={5}
//                 />
//                 <StatCard
//                   title="Total Guides"
//                   value={stats.totalGuides}
//                   icon={MapPin}
//                   color="bg-orange-500"
//                   change={15}
//                 />
//               </div>

//               {/* Secondary Stats */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <StatCard
//                   title="Total Mentors"
//                   value={stats.totalMentors}
//                   icon={UserCheck}
//                   color="bg-yellow-500"
//                   change={3}
//                 />
//                 <StatCard
//                   title="Books Available"
//                   value={stats.totalBooks}
//                   icon={BookOpen}
//                   color="bg-indigo-500"
//                 />
//                 <StatCard
//                   title="Grocery Items"
//                   value={stats.totalGroceryItems}
//                   icon={ShoppingCart}
//                   color="bg-pink-500"
//                   change={20}
//                 />
//                 <StatCard
//                   title="Food Vendors"
//                   value={stats.totalFoodVendors}
//                   icon={UtensilsCrossed}
//                   color="bg-cyan-500"
//                   change={7}
//                 />
//               </div>

//               {/* Recent Activities */}
//               <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
//                   <button className="text-yellow-500 hover:text-yellow-400 text-sm font-medium">
//                     View All
//                   </button>
//                 </div>
//                 <div className="space-y-4">
//                   {recentActivities.map((activity) => (
//                     <ActivityItem key={activity.id} activity={activity} />
//                   ))}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
//                 <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                   <button className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
//                     <Plus className="w-5 h-5 text-yellow-500" />
//                     <span>Add New Guide</span>
//                   </button>
//                   <button className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
//                     <Building className="w-5 h-5 text-blue-500" />
//                     <span>Add New Hostel</span>
//                   </button>
//                   <button className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
//                     <UserCheck className="w-5 h-5 text-green-500" />
//                     <span>Add New Mentor</span>
//                   </button>
//                   <button className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
//                     <ShoppingCart className="w-5 h-5 text-pink-500" />
//                     <span>Add Grocery Item</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Placeholder for other sections */}
//           {activeTab !== 'dashboard' && (
//             <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
//               <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                 {(() => {
//                   const item = navItems.find(item => item.id === activeTab);
//                   const Icon = item?.icon || Building;
//                   return <Icon className="w-8 h-8 text-black" />;
//                 })()}
//               </div>
//               <h3 className="text-xl font-semibold text-white mb-2">
//                 {navItems.find(item => item.id === activeTab)?.label} Management
//               </h3>
//               <p className="text-gray-400 mb-6">
//                 This section is under development. The {activeTab} management component will be implemented here.
//               </p>
//               <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-medium transition-colors">
//                 Coming Soon
//               </button>
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Mobile sidebar overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}
      
//       {/* Notification overlay for mobile */}
//       {showNotifications && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
//           onClick={() => setShowNotifications(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminPanel;









import React, { useState } from 'react';
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
  LogOut,
  Menu,
  X
} from 'lucide-react';

// Import individual components
import Dashboard from '../components/Admin/Dashboard';
import HostelsManagement from '../components/Admin/Hostels';
import FoodManagement from '../components/Admin/Food';
import BooksManagement from '../components/Admin/Books';
import GroceryManagement from '../components/Admin/Grocery';
import GuideManagement from '../components/Admin/Guide';
import MentorManagement from '../components/Admin/Mentor';
import AdmissionManagement from '../components/Admin/Admission';
import UsersManagement from '../components/Admin/Users';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'hostels', label: 'Hostels', icon: Building },
    { id: 'food', label: 'Food', icon: UtensilsCrossed },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'grocery', label: 'Grocery', icon: ShoppingCart },
    { id: 'guide', label: 'Guide', icon: MapPin },
    { id: 'mentor', label: 'Mentor', icon: UserCheck },
    { id: 'admission', label: 'Admission', icon: GraduationCap },
    { id: 'users', label: 'Users', icon: Users }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'hostels':
        // return <HostelsManagement />;
         return <Dashboard />;
      case 'food':
        return <FoodManagement />;
      case 'books':
        // return <BooksManagement />;
         return <Dashboard />;
      case 'grocery':
        // return <GroceryManagement />;
         return <Dashboard />;
      case 'guide':
        return <GuideManagement />;
        //  return <Dashboard />;
      case 'mentor':
        // return <MentorManagement />;
         return <Dashboard />;
      case 'admission':
        // return <AdmissionManagement />;
         return <Dashboard />;
      case 'users':
        // return <UsersManagement />;
         return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">S</span>
              </div>
              <h1 className="text-xl font-bold">
                <span className="text-white">Student</span>
                <span className="text-yellow-500">Guide</span>
                <span className="text-gray-400 ml-2">Admin</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">A</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="text-lg font-semibold">Menu</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="mt-8 px-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-yellow-500 text-black font-medium'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors mt-8">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          {renderContent()}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminPanel;