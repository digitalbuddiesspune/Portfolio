import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Save, LogOut, Package, LayoutGrid, Upload, Loader2 } from 'lucide-react';

const API_URL = 'http://localhost:3000/api/admin';

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

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch portfolios
  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/portfolio`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
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
        setError(response.ok ? 'Invalid response from server.' : `Upload failed (${response.status}). Is the backend running on port 3000?`);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-900 to-indigo-900 text-white shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <LayoutGrid className="w-6 h-6" />
            Admin Panel
          </h1>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => {
              setActiveView('products');
              setError('');
              setSuccess('');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeView === 'products'
                ? 'bg-white/20 text-white shadow-lg'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="font-medium">All Products</span>
            <span className="ml-auto bg-white/20 px-2 py-1 rounded text-xs">
              {portfolios.length}
            </span>
          </button>

          <button
            onClick={openAddForm}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeView === 'add'
                ? 'bg-white/20 text-white shadow-lg'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Product</span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-red-600/20 hover:text-white transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="px-8 py-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeView === 'products' ? 'All Products' : editingItem ? 'Edit Product' : 'Add New Product'}
            </h2>
          </div>
        </header>

        <div className="p-8">
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
                      <div className="flex">
                        <div className="w-48 h-48 bg-gray-200 overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                            }}
                          />
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
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
                          <div className="flex gap-3 mt-4">
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
            <div className="max-w-3xl">
              <div className="bg-white rounded-lg shadow-md p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <option value="crm development">CRM Development</option>
                        <option value="e-commerce development">E-commerce Development</option>
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
        </div>
      </main>
    </div>
  );
}
