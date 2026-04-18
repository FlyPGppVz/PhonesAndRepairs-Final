const API_BASE = '/api';

export const phpApi = {
  getProducts: async () => {
    try {
      const res = await fetch(`${API_BASE}/get_products.php`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Error fetching products');
      const data = await res.json();
      return data.data || data; // Handle both direct array and {data: []} wrapper
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  getProduct: async (idOrSlug: string) => {
    try {
      const res = await fetch(`${API_BASE}/get_product.php?slug=${idOrSlug}&id=${idOrSlug}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Error fetching product');
      const data = await res.json();
      return data.data || data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  uploadImage: async (file: File, token: string) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_BASE}/upload_image.php`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Upload error');
    }

    const data = await res.json();
    return data.url;
  },

  saveProduct: async (productData: any, method: 'POST' | 'PUT', token: string) => {
    const res = await fetch(`${API_BASE}/admin_products.php`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error saving product');
    }

    return await res.json();
  },

  deleteProduct: async (id: string, token: string) => {
    const res = await fetch(`${API_BASE}/admin_products.php?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error deleting product');
    }

    return await res.json();
  },
  
  submitQuote: async (quoteData: any) => {
    return true;
  },
  
  subscribeNewsletter: async (email: string) => {
    return true;
  },

  login: async (username: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }

    return await res.json();
  }
};
