import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Save, LogOut, Package, LayoutGrid, Upload, Loader2, MessageCircle } from 'lucide-react';
import API_BASE_URL from '../config/api.js';

const API_URL = `${API_BASE_URL}/api/admin`;

export default function AdminDashboard() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeView, setActiveView] = useState('products'); // 'products' or 'add'
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'website development',
    webType: '',
    websiteLink: '',
    image: '',
    description: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Testimonials
  const [testimonials, setTestimonialsList] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    avatar: '',
    projectName: '',
    description: '',
    clientName: '',
    clientLocation: '',
    stars: 5
  });
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef(null);

  const clearAuthAndRedirect = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // Check authentication, then load portfolios
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchPortfolios();
  }, [navigate]);

  const fetchTestimonials = async () => {
    setTestimonialsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        clearAuthAndRedirect();
        return;
      }
      const response = await fetch(`${API_URL}/testimonials`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.status === 401 || response.status === 403) {
        clearAuthAndRedirect();
        return;
      }
      const data = await response.json();
      if (data.success) setTestimonialsList(data.data);
    } catch (err) {
      setError('Failed to fetch testimonials');
    } finally {
      setTestimonialsLoading(false);
    }
  };

  useEffect(() => {
    if (activeView === 'testimonials' || activeView === 'addTestimonial') {
      fetchTestimonials();
    }
  }, [activeView]);

  const fetchPortfolios = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        clearAuthAndRedirect();
        return;
      }
      const response = await fetch(`${API_URL}/portfolio`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401 || response.status === 403) {
        clearAuthAndRedirect();
        return;
      }
      const data = await response.json();
      if (data.success) {
        setPortfolios(data.data);
      } else {
        setError('Failed to fetch portfolios');
      }
    } catch (err) {
      setError('Network error. Please check if the server is running.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuthAndRedirect();
  };

  const openAddForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'website development',
      webType: '',
      websiteLink: '',
      image: '',
      description: ''
    });
    setActiveView('add');
    setError('');
    setSuccess('');
  };

  const openEditForm = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      category: item.category || 'website development',
      webType: item.webType || '',
      websiteLink: item.websiteLink || '',
      image: item.image || '',
      description: item.description || ''
    });
    setActiveView('add');
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingItem 
        ? `${API_URL}/portfolio/${editingItem._id}`
        : `${API_URL}/portfolio`;
      
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(editingItem ? 'Product updated successfully!' : 'Product added successfully!');
        setFormData({
          name: '',
          category: 'website development',
          webType: '',
          websiteLink: '',
          image: '',
          description: ''
        });
        setEditingItem(null);
        fetchPortfolios();
        setTimeout(() => {
          setActiveView('products');
          setSuccess('');
        }, 1500);
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Submit error:', err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, GIF, or WebP).');
      return;
    }
    setError('');
    setUploadingImage(true);
    try {
      const token = localStorage.getItem('adminToken');
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);
      const response = await fetch(`${API_URL}/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      });
      const raw = await response.text();
      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        setError(response.ok ? 'Invalid response from server.' : `Upload failed (${response.status}). Please check if the backend server is running.`);
        return;
      }
      if (data.success && data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        setSuccess('Image uploaded to Cloudinary.');
        setTimeout(() => setSuccess(''), 2000);
      } else {
        setError(data.message || data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Image upload failed. Check your connection and that the backend is running (npm start in bakend folder).');
      console.error('Upload error:', err);
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Product deleted successfully!');
        fetchPortfolios();
        setTimeout(() => setSuccess(''), 2000);
      } else {
        setError(data.message || 'Delete failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Delete error:', err);
    }
  };

  const openAddTestimonialForm = () => {
    setEditingTestimonial(null);
    setTestimonialForm({ avatar: '', projectName: '', description: '', clientName: '', clientLocation: '', stars: 5 });
    setActiveView('addTestimonial');
    setError('');
    setSuccess('');
  };

  const openEditTestimonialForm = (item) => {
    setEditingTestimonial(item);
    setTestimonialForm({
      avatar: item.avatar || '',
      projectName: item.projectName || '',
      description: item.description || '',
      clientName: item.clientName || '',
      clientLocation: item.clientLocation || '',
      stars: item.stars ?? 5
    });
    setActiveView('addTestimonial');
    setError('');
    setSuccess('');
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    setError('');
    setUploadingAvatar(true);
    try {
      const token = localStorage.getItem('adminToken');
      const fd = new FormData();
      fd.append('image', file);
      const response = await fetch(`${API_URL}/upload-image`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: fd
      });
      const raw = await response.text();
      const data = raw ? JSON.parse(raw) : {};
      if (data.success && data.url) {
        setTestimonialForm((prev) => ({ ...prev, avatar: data.url }));
        setSuccess('Avatar uploaded.');
        setTimeout(() => setSuccess(''), 2000);
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (err) {
      setError('Avatar upload failed. Check connection.');
    } finally {
      setUploadingAvatar(false);
      e.target.value = '';
    }
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!testimonialForm.avatar || !testimonialForm.projectName || !testimonialForm.description) {
      setError('Avatar, project name and description are required.');
      return;
    }
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingTestimonial
        ? `${API_URL}/testimonials/${editingTestimonial._id}`
        : `${API_URL}/testimonials`;
      const method = editingTestimonial ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(testimonialForm)
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(editingTestimonial ? 'Testimonial updated!' : 'Testimonial added!');
        setTestimonialForm({ avatar: '', projectName: '', description: '', clientName: '', clientLocation: '', stars: 5 });
        setEditingTestimonial(null);
        fetchTestimonials();
        setTimeout(() => { setSuccess(''); setActiveView('testimonials'); }, 1500);
      } else {
        setError(data.message || 'Failed to save');
      }
    } catch (err) {
      setError('Network error.');
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Testimonial deleted.');
        fetchTestimonials();
        setTimeout(() => setSuccess(''), 2000);
      } else setError(data.message || 'Delete failed');
    } catch (err) {
      setError('Network error.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gradient-to-b from-purple-900 to-indigo-900 text-white shadow-2xl flex flex-col h-screen md:h-auto">
        <div className="p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">Admin Panel</span>
            <span className="sm:hidden">Admin</span>
          </h1>
        </div>

        <nav className="p-3 sm:p-4 space-y-2 flex-1 overflow-y-auto">
          <button
            onClick={() => {
              setActiveView('products');
              setError('');
              setSuccess('');
            }}
            className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all ${
              activeView === 'products'
                ? 'bg-white/20 text-white shadow-lg'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">All Products</span>
            <span className="ml-auto bg-white/20 px-2 py-1 rounded text-xs">
              {portfolios.length}
            </span>
          </button>

          <button
            onClick={openAddForm}
            className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all ${
              activeView === 'add'
                ? 'bg-white/20 text-white shadow-lg'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Add Product</span>
          </button>

          <button
            onClick={() => { setActiveView('testimonials'); setError(''); setSuccess(''); fetchTestimonials(); }}
            className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all ${
              activeView === 'testimonials'
                ? 'bg-white/20 text-white shadow-lg'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Testimonials</span>
            <span className="ml-auto bg-white/20 px-2 py-1 rounded text-xs">
              {testimonials.length}
            </span>
          </button>

          <button
            onClick={openAddTestimonialForm}
            className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all ${
              activeView === 'addTestimonial'
                ? 'bg-white/20 text-white shadow-lg'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Add Testimonial</span>
          </button>
        </nav>

        {/* Logout button at bottom */}
        <div className="p-4 border-t border-white/10 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-white border border-red-500/30 hover:border-red-500/50 transition-all"
            title="Logout"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto min-w-0 h-screen md:h-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {activeView === 'products' && 'All Products'}
              {activeView === 'add' && (editingItem ? 'Edit Product' : 'Add New Product')}
              {activeView === 'testimonials' && 'Client Testimonials'}
              {activeView === 'addTestimonial' && (editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial')}
            </h2>
          </div>
        </header>

        <div className="p-4 sm:p-6 md:p-8">
          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Products View */}
          {activeView === 'products' && (
            <div className="space-y-4">
              {portfolios.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-4">No products found</p>
                  <button
                    onClick={openAddForm}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Your First Product
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {portfolios.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-48 h-48 sm:h-48 bg-gray-200 overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                            }}
                          />
                        </div>
                        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                              {item.name || 'Untitled Product'}
                            </h3>
                            <p className="text-sm text-purple-600 font-semibold mb-2 capitalize">
                              {item.category}
                            </p>
                            {item.webType && (
                              <p className="text-sm text-gray-600 mb-2">
                                <span className="font-medium">Type:</span> {item.webType}
                              </p>
                            )}
                            {item.description && (
                              <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                                {item.description}
                              </p>
                            )}
                            {item.websiteLink && (
                              <a
                                href={item.websiteLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                Visit Website →
                              </a>
                            )}
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                            <button
                              onClick={() => openEditForm(item)}
                              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Add/Edit Form View */}
          {activeView === 'add' && (
            <div className="max-w-3xl w-full">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white"
                        placeholder="Enter product name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white"
                      >
                        <option value="website development">Website Development</option>
                        <option value="app development">App Development</option>
                        <option value="e-commerce development">E-commerce Development</option>
                        <option value="game development">Game Development</option>
                        <option value="saas">SaaS</option>
                        <option value="salesforce development">Salesforce Development</option>
                        <option value="cloud based development">Cloud Based Development</option>
                        <option value="custom software development">Custom Software Development</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Web Type / Technology
                    </label>
                    <input
                      type="text"
                      value={formData.webType}
                      onChange={(e) => setFormData({ ...formData, webType: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white"
                      placeholder="e.g., React, Vue, Angular, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Website Link
                    </label>
                    <input
                      type="url"
                      value={formData.websiteLink}
                      onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Image *
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-purple-100 text-purple-700 rounded-lg border-2 border-purple-300 hover:bg-purple-200 focus:ring-2 focus:ring-purple-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                      >
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Uploading…
                          </>
                        ) : (
                          <>
                            <Upload className="w-5 h-5" />
                            Upload image
                          </>
                        )}
                      </button>
                      <span className="text-sm text-gray-500">
                        Click to open file manager — image will be uploaded to Cloudinary and saved in the database.
                      </span>
                    </div>
                    {formData.image && (
                      <div className="mt-3 flex items-start gap-3">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <p className="text-xs text-gray-500 break-all max-w-md">Saved URL: {formData.image}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white resize-none"
                      placeholder="Enter product description..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
                    >
                      <Save className="w-5 h-5" />
                      {editingItem ? 'Update Product' : 'Add Product'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveView('products');
                        setEditingItem(null);
                        setFormData({
                          name: '',
                          category: 'website development',
                          webType: '',
                          websiteLink: '',
                          image: '',
                          description: ''
                        });
                      }}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Testimonials List View */}
          {activeView === 'testimonials' && (
            <div className="space-y-4">
              {testimonialsLoading ? (
                <div className="text-center py-12 text-gray-500">Loading testimonials...</div>
              ) : testimonials.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-4">No testimonials yet</p>
                  <button
                    onClick={openAddTestimonialForm}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add First Testimonial
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {testimonials.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col sm:flex-row"
                    >
                      <div className="sm:w-24 h-24 sm:h-auto flex-shrink-0 flex items-center justify-center p-2">
                        {item.avatar ? (
                          <img
                            src={item.avatar}
                            alt={item.projectName}
                            className="w-20 h-20 rounded-full object-cover"
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.remove('hidden'); }}
                          />
                        ) : null}
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-bold text-lg ${item.avatar ? 'hidden' : ''}`}
                          aria-hidden={!!item.avatar}
                        >
                          {(() => {
                            const n = (item.clientName || item.projectName || '').trim();
                            if (!n) return '?';
                            const parts = n.split(/\s+/).filter(Boolean);
                            if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase().slice(0, 2);
                            return n.slice(0, 2).toUpperCase();
                          })()}
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <h3 className="text-lg font-bold text-gray-900">{item.projectName}</h3>
                        {item.clientName && <p className="text-sm text-gray-600">{item.clientName}</p>}
                        {item.clientLocation && <p className="text-sm text-gray-500 italic">{item.clientLocation}</p>}
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.description}</p>
                        <p className="text-amber-500 text-sm mt-1">{"★".repeat(item.stars || 5)}</p>
                      </div>
                      <div className="flex gap-2 p-4 self-center">
                        <button
                          onClick={() => openEditTestimonialForm(item)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Edit2 className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(item._id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Add/Edit Testimonial Form */}
          {activeView === 'addTestimonial' && (
            <div className="max-w-3xl w-full">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                <form onSubmit={handleTestimonialSubmit} className="space-y-4 sm:space-y-6">
                  {/* 1. Avatar */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Avatar (project/client image) *</label>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        disabled={uploadingAvatar}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-purple-100 text-purple-700 rounded-lg border-2 border-purple-300 hover:bg-purple-200 disabled:opacity-60"
                      >
                        {uploadingAvatar ? <><Loader2 className="w-5 h-5 animate-spin" /> Uploading…</> : <><Upload className="w-5 h-5" /> Upload avatar</>}
                      </button>
                    </div>
                    {testimonialForm.avatar && (
                      <div className="mt-3">
                        <img src={testimonialForm.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover border border-gray-300" />
                      </div>
                    )}
                  </div>
                  {/* 2. Project name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Project name *</label>
                    <input
                      type="text"
                      value={testimonialForm.projectName}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, projectName: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-black bg-white"
                      placeholder="e.g. Restrobazzar, E‑commerce App"
                    />
                  </div>
                  {/* 3. Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Review / Description *</label>
                    <textarea
                      value={testimonialForm.description}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, description: e.target.value })}
                      required
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-black bg-white resize-none"
                      placeholder="Client testimonial text..."
                    />
                  </div>
                  {/* 4. Client name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Client name</label>
                    <input
                      type="text"
                      value={testimonialForm.clientName}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, clientName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-black bg-white"
                      placeholder="Client or company name"
                    />
                  </div>
                  {/* 5. Location */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={testimonialForm.clientLocation}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, clientLocation: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-black bg-white"
                      placeholder="e.g. New York, Remote"
                    />
                  </div>
                  {/* 6. Stars */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stars (1-5)</label>
                    <select
                      value={testimonialForm.stars}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, stars: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-black bg-white"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700"
                    >
                      <Save className="w-5 h-5" />
                      {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActiveView('testimonials'); setEditingTestimonial(null); setTestimonialForm({ avatar: '', projectName: '', description: '', clientName: '', clientLocation: '', stars: 5 }); }}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
