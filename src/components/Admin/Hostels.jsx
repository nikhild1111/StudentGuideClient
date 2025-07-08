import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { 
  fetchHostels, 
  createHostel, 
  updateHostel, 
  deleteHostel 
} from '../../services/operations/hostelAPI';

import {
  ChevronLeft, ChevronRight, MapPin, Phone, Wifi, Shield, Zap,
  UtensilsCrossed, Shirt, Bath, Droplets, Search, Star, Filter, Loader2
} from 'lucide-react';
const HostelAdminPanel = () => {
  const dispatch = useDispatch();
  const { hostels, loading, pagination,error } = useSelector(state => state.hostel);

    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'edit'

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedHostel, setSelectedHostel] = useState(null);

  const hostelsPerPage = 6;
  const [formData, setFormData] = useState({
    name: '',
    type: 'boys',
    rent: '',
    rating: '',
    images: [],
    video: '',
    services: [],
    address: {
      full: '',
      landmark: '',
      gully: '',
      building: ''
    },
    contact: '',
    description: ''
  });

  const serviceOptions = [
    'wifi', 'security', 'electricity', 'food', 
    'washing', 'washroom', 'personal_toilet', 'water_filter'
  ];

  // Load hostels on component mount and when filters change
  useEffect(() => {
   if (currentPage > 1) {
       dispatch(fetchHostels({ page: currentPage, limit: hostelsPerPage, search: searchTerm, type: genderFilter }));
     }
  }, [dispatch, currentPage]);


  
  useEffect(() => {
     setCurrentPage(1);
   dispatch(fetchHostels({ page: 1, limit: hostelsPerPage, search: searchTerm, type: genderFilter }));
   
  }, [genderFilter]);

  // Handle search


  const resetFiltersThenSearch = () => {
   setSearchTerm('');
      setGenderFilter('all');
      setCurrentPage(1);
      dispatch(fetchHostels({
        page: 1,
        limit: hostelsPerPage,
        search: '',
        type: 'all',
      }));
  };
 

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle service selection
  const handleServiceChange = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'images') {
      setFormData(prev => ({ ...prev, images: Array.from(files) }));
    } else if (name === 'video') {
      setFormData(prev => ({ ...prev, video: files[0] }));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      type: 'boys',
      rent: '',
      rating: '',
      images: [],
      video: '',
      services: [],
      address: {
        full: '',
        landmark: '',
        gully: '',
        building: ''
      },
      contact: '',
      description: ''
    });
  };

  // Open create modal
  const handleCreate = () => {
    setModalType('create');
    resetForm();
    setShowModal(true);
  };

  // Open edit modal
  const handleEdit = (hostel) => {
    setModalType('edit');
    setSelectedHostel(hostel);
    setFormData({
      name: hostel.name,
      type: hostel.type,
      rent: hostel.rent,
      rating: hostel.rating,
      images: [],
      video: '',
      services: hostel.services,
      address: hostel.address,
      contact: hostel.contact,
      description: hostel.description
    });
    setShowModal(true);
  };


  let totalPages=0;
let total =0;
if(pagination){
 totalPages= pagination.totalPages;
total= pagination.total;
}
  // Handle form submit
  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.type || !formData.rent || !formData.address.full || !formData.contact) {
      toast.error('Please fill in all required fields');
      return;
    }

    const submitData = new FormData();
    
    // Append basic fields
    submitData.append('name', formData.name);
    submitData.append('type', formData.type);
    submitData.append('rent', formData.rent);
    submitData.append('rating', formData.rating);
    submitData.append('contact', formData.contact);
    submitData.append('description', formData.description);
    
    // Append address as JSON
    submitData.append('address', JSON.stringify(formData.address));
    
    // Append services as JSON
    submitData.append('services', JSON.stringify(formData.services));
    
    // Append files
    formData.images.forEach(image => {
      submitData.append('images', image);
    });
    
    if (formData.video) {
      submitData.append('video', formData.video);
    }

    const callback = () => {
      setShowModal(false);
    dispatch(fetchHostels({ page: currentPage, limit: hostelsPerPage, search: searchTerm, type: genderFilter }));
    };

    if (modalType === 'create') {
      dispatch(createHostel(submitData, callback));
    } else {
      dispatch(updateHostel(selectedHostel._id, submitData, callback));
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteHostel(deleteId, () => {
      setShowDeleteModal(false);
     dispatch(fetchHostels({ page: currentPage, limit: hostelsPerPage, search: searchTerm, type: genderFilter }));
    }));
  };

  // Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get totals for stats
  const getTotalsByType = () => {
    const boysCount = hostels.filter(h => h.type === 'boys').length;
    const girlsCount = hostels.filter(h => h.type === 'girls').length;
    return { total: hostels.length, boys: boysCount, girls: girlsCount };
  };

  const stats = getTotalsByType();

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6 text-white">
      {/* Header */}
       <div className="bg-gray-900 p-4 md:p-6 border-b border-gray-800">
             <div className="max-w-7xl mx-auto">
               <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                 Welcome to <span className="text-yellow-400">hostel  Manegment</span>
               </h1>
               
               {/* Search and Filter */}
               <div className="flex flex-row gap-4 items-center">
                 <div className="flex-1 relative">
                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                   <input
                     type="text"
                     placeholder="Search hostels by name or location..."
                     className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => {
         if (e.key === 'Enter' && searchTerm.trim() !== '') {
           setCurrentPage(1);
           dispatch(fetchHostels({
             page: 1,
             limit: hostelsPerPage,
             search: searchTerm,
             type: genderFilter,
           }));
           setSearchTerm('');
         }
       }}
     
     
                   />
                 </div>
                 
                 <div className="flex gap-2">
                   <button
                     onClick={() => setShowFilters(!showFilters)}
                     className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                   >
                     <Filter className="w-5 h-5" />
                     <span className="hidden sm:inline">Filters</span>
                   </button>
                 </div>
               </div>
               
               {/* Gender Filter */}
               {showFilters && (
                 <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                   <h3 className="text-lg font-medium mb-3">Filter by Gender</h3>
                   <div className="flex gap-2">
                     {[
                       { value: 'all', label: 'All' },
                       { value: 'boys', label: 'Boys Only' },
                       { value: 'girls', label: 'Girls Only' }
                     ].map(filter => (
                       <button
                         key={filter.value}
                         onClick={() => setGenderFilter(filter.value)}
                         className={`px-3 py-2 rounded-lg transition-colors ${
                           genderFilter === filter.value
                             ? 'bg-yellow-400 text-gray-900'
                             : 'bg-gray-600 hover:bg-gray-500'
                         }`}
                       >
                         {filter.label}
                       </button>
     
     
                     ))}
     
                     <button
       onClick={resetFiltersThenSearch}
       className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
     >
       Reset 
     </button>
     
                   </div>
                 </div>
               )}
               
               {/* Results count */}
               <div className="mt-4 text-sm text-gray-400">
                 {loading ? (
                   <div className="flex items-center gap-2">
                     <Loader2 className="w-4 h-4 animate-spin" />
                     <span>Searching...</span>
                   </div>
                 ) : (
                   <span>Showing {hostels.length} of {total} hostels</span>
                 )}
               </div>
             </div>
           </div>
     
           {/* Error Message */}
           {error && (
             <div className="max-w-7xl mx-auto p-4">
               <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
                 {error}
               </div>
             </div>
           )}
     

      {/* Stats Cards */}
      <div className="grid grid-cols-1 max-w-7xl mx-auto md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-800 border  border-gray-600 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Hostels</p>
              <p className="text-2xl font-bold text-white">{pagination?.total || 0}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border  border-gray-600 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Boys Hostels</p>
              <p className="text-2xl font-bold text-white">{stats.boys}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border  border-gray-600 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Girls Hostels</p>
              <p className="text-2xl font-bold text-white">{stats.girls}</p>
            </div>
            <div className="bg-pink-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      Hostels Grid
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {hostels.map(hostel => (
            <div key={hostel._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 relative">
                {hostel.images && hostel.images.length > 0 ? (
                  <img 
                    src={hostel.images[0]} 
                    alt={hostel.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                  hostel.type === 'boys' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'
                }`}>
                  {hostel.type}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{hostel.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{hostel.address.full}</p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-600 ml-1">{hostel.rating || 0}</span>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-4">₹{hostel.rent}/month</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(hostel)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hostel._id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}







      {/* Pagination */}
  {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                const isCurrentPage = pageNumber === currentPage;
                
                // Show first page, last page, current page, and pages around current
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        isCurrentPage
                          ? 'bg-yellow-400 text-gray-900'
                          : 'bg-gray-700 hover:bg-gray-600 text-white'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                
                // Show ellipsis
                if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                  return (
                    <span key={pageNumber} className="w-10 h-10 flex items-center justify-center text-gray-400">
                      ...
                    </span>
                  );
                }
                
                return null;
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}


      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {modalType === 'create' ? 'Create New Hostel' : 'Edit Hostel'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="boys">Boys</option>
                      <option value="girls">Girls</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rent *
                    </label>
                    <input
                      type="number"
                      name="rent"
                      value={formData.rent}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact *
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Images
                    </label>
                    <input
                      type="file"
                      name="images"
                      onChange={handleFileChange}
                      multiple
                      accept="image/*"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address *
                  </label>
                  <input
                    type="text"
                    name="address.full"
                    value={formData.address.full}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Landmark
                    </label>
                    <input
                      type="text"
                      name="address.landmark"
                      value={formData.address.landmark}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gully
                    </label>
                    <input
                      type="text"
                      name="address.gully"
                      value={formData.address.gully}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Building
                    </label>
                    <input
                      type="text"
                      name="address.building"
                      value={formData.address.building}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Services
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {serviceOptions.map(service => (
                      <label key={service} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceChange(service)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm capitalize">{service.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : modalType === 'create' ? 'Create' : 'Update'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this hostel? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelAdminPanel;