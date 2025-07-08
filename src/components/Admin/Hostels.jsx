import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterIcon from '@mui/icons-material/FilterAlt';

const HostelManagement = () => {
  const navigate = useNavigate();
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentHostel, setCurrentHostel] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 1
  });
  const [filters, setFilters] = useState({
    search: '',
    type: 'all'
  });

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'boys',
    rent: '',
    rating: 0,
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
    'wifi',
    'security',
    'electricity',
    'food',
    'washing',
    'washroom',
    'personal_toilet',
    'water_filter'
  ];

  // Fetch hostels with pagination and filters
  const fetchHostels = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/hostels/fetch', {
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        type: filters.type
      });
      setHostels(response.data.data);
      setPagination(prev => ({
        ...prev,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch hostels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, [pagination.page, filters]);

  const handlePageChange = (event, value) => {
    setPagination(prev => ({ ...prev, page: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when filters change
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  };

  const handleServicesChange = (event) => {
    const { value } = event.target;
    setFormData(prev => ({ ...prev, services: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'boys',
      rent: '',
      rating: 0,
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
    setIsEditMode(false);
    setCurrentHostel(null);
  };

  const handleOpenDialog = (hostel = null) => {
    if (hostel) {
      setFormData({
        name: hostel.name,
        type: hostel.type,
        rent: hostel.rent,
        rating: hostel.rating,
        images: hostel.images,
        video: hostel.video,
        services: hostel.services,
        address: hostel.address,
        contact: hostel.contact,
        description: hostel.description
      });
      setIsEditMode(true);
      setCurrentHostel(hostel);
    } else {
      resetForm();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        ...formData,
        address: JSON.stringify(formData.address)
      };

      if (isEditMode) {
        await axios.put(`/api/hostels/update/${currentHostel._id}`, data);
        setSuccess('Hostel updated successfully');
      } else {
        await axios.post('/api/hostels/create', data);
        setSuccess('Hostel created successfully');
      }
      fetchHostels();
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hostel?')) {
      try {
        setLoading(true);
        await axios.delete(`/api/hostels/delete/${id}`);
        setSuccess('Hostel deleted successfully');
        fetchHostels();
      } catch (err) {
        setError(err.response?.data?.message || 'Deletion failed');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setError('');
    setSuccess('');
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Hostel Management
      </Typography>

      {/* Filters and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search hostels..."
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                InputProps={{
                  startAdornment: <SearchIcon color="action" />
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  label="Type"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="boys">Boys</MenuItem>
                  <MenuItem value="girls">Girls</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
              >
                Add Hostel
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Hostels List */}
      {loading && hostels.length === 0 ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : hostels.length === 0 ? (
        <Card>
          <CardContent>
            <Typography align="center" color="textSecondary">
              No hostels found. Add a new hostel to get started.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <Grid container spacing={3}>
            {hostels.map((hostel) => (
              <Grid item xs={12} sm={6} md={4} key={hostel._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6" gutterBottom>
                        {hostel.name}
                      </Typography>
                      <Chip
                        label={hostel.type}
                        color={hostel.type === 'boys' ? 'primary' : 'secondary'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {hostel.address.full}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      ₹{hostel.rent}/month
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {hostel.services.map((service) => (
                        <Chip key={service} label={service} size="small" />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleOpenDialog(hostel)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDelete(hostel._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={pagination.totalPages}
                page={pagination.page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEditMode ? 'Edit Hostel' : 'Add New Hostel'}
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hostel Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    label="Type"
                    required
                  >
                    <MenuItem value="boys">Boys</MenuItem>
                    <MenuItem value="girls">Girls</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Monthly Rent (₹)"
                  name="rent"
                  type="number"
                  value={formData.rent}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Rating (0-5)"
                  name="rating"
                  type="number"
                  value={formData.rating}
                  onChange={handleInputChange}
                  inputProps={{ min: 0, max: 5 }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Address"
                  name="full"
                  value={formData.address.full}
                  onChange={handleAddressChange}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Landmark"
                  name="landmark"
                  value={formData.address.landmark}
                  onChange={handleAddressChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Gully/Street"
                  name="gully"
                  value={formData.address.gully}
                  onChange={handleAddressChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Building Name/No."
                  name="building"
                  value={formData.address.building}
                  onChange={handleAddressChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Services</InputLabel>
                  <Select
                    multiple
                    name="services"
                    value={formData.services}
                    onChange={handleServicesChange}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {serviceOptions.map((service) => (
                      <MenuItem key={service} value={service}>
                        <Checkbox checked={formData.services.indexOf(service) > -1} />
                        <ListItemText primary={service} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Video URL (optional)"
                  name="video"
                  value={formData.video}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="hostel-images"
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                />
                <label htmlFor="hostel-images">
                  <Button variant="outlined" component="span" startIcon={<AddIcon />}>
                    Upload Images
                  </Button>
                </label>
                {formData.images.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                    {formData.images.map((img, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={img}
                        alt={`Hostel ${index + 1}`}
                        sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
                      />
                    ))}
                  </Box>
                )}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : isEditMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbars for feedback */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HostelManagement;