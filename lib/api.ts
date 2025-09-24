/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { 
  AxiosInstance, 
  InternalAxiosRequestConfig, 
  AxiosResponse, 
  AxiosError 
} from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000');

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For JWT cookies
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Note: Authentication is handled by cookies, no need to add tokens manually

    // Add request timestamp for debugging
    if (process.env.NEXT_PUBLIC_ENABLE_DEBUG_MODE === 'true') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses in debug mode
    if (process.env.NEXT_PUBLIC_ENABLE_DEBUG_MODE === 'true') {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  async (error: AxiosError) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - try to refresh token first
          const originalRequest = error.config;
          
          // Avoid infinite loops - don't refresh if this request was already a refresh attempt
          if (originalRequest && !originalRequest.url?.includes('/auth/refresh')) {
            try {
              // Attempt to refresh the token
              const refreshResponse = await apiHelpers.post('/auth/refresh');
              
              if (refreshResponse.status === 200) {
                // Token refreshed successfully, retry the original request
                return api.request(originalRequest);
              }
            } catch (refreshError) {
              // Refresh failed - show user-friendly message before logout
              console.warn('Token refresh failed, session expired');
              
              // Show a brief notification before redirecting
              if (typeof window !== 'undefined') {
                // Check if we're not already on login page to avoid infinite redirects
                if (!window.location.pathname.includes('/auth/login')) {
                  // Show a toast notification if available
                  const event = new CustomEvent('session-expired', {
                    detail: { message: 'Your session has expired. Please log in again.' }
                  });
                  window.dispatchEvent(event);
                  
                  // Small delay to allow user to see the message
                  setTimeout(() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('active_restaurant');
                    localStorage.removeItem('active_venue');
                    window.location.href = '/auth/login';
                  }, 1000);
                }
              }
            }
          } else {
            // This was a refresh request that failed - immediate logout
            localStorage.removeItem('user');
            localStorage.removeItem('active_restaurant');
            localStorage.removeItem('active_venue');
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
              window.location.href = '/auth/login';
            }
          }
          break;
        
        case 403:
          // Forbidden - user doesn't have permission
          console.error('❌ Access Forbidden:', data);
          break;
        
        case 404:
          // Not found
          console.error('❌ Resource Not Found:', error.config?.url);
          break;
        
        case 422:
          // Validation error
          console.error('❌ Validation Error:', data);
          break;
        
        case 429:
          // Rate limited
          console.error('❌ Rate Limited - Too Many Requests');
          break;
        
        case 500:
          // Server error
          console.error('❌ Server Error:', data);
          break;
        
        default:
          console.error(`❌ API Error ${status}:`, data);
      }
    } else if (error.request) {
      // Network error
      console.error('❌ Network Error:', error.message);
    } else {
      // Request setup error
      console.error('❌ Request Setup Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// API helper functions
export const apiHelpers = {
  // Generic GET request
  get: <T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.get<T>(url, config);
  },

  // Generic POST request
  post: <T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.post<T>(url, data, config);
  },

  // Generic PATCH request
  patch: <T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.patch<T>(url, data, config);
  },

  // Generic PUT request
  put: <T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.put<T>(url, data, config);
  },

  // Generic DELETE request
  delete: <T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.delete<T>(url, config);
  },

  // File upload helper
  uploadFile: <T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<AxiosResponse<T>> => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
  },

  // Download file helper
  downloadFile: async (url: string, filename?: string): Promise<void> => {
    try {
      const response = await api.get(url, {
        responseType: 'blob',
      });

      // Create blob link to download
      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename || 'download';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('❌ Download Error:', error);
      throw error;
    }
  },

  // Note: Authentication is handled by cookies
  // No need for manual token management
};

export default api;
