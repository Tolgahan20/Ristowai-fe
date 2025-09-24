/**
 * Proactive token refresh service
 * Refreshes tokens before they expire to prevent sudden logouts
 */

import { apiHelpers } from './api';

class TokenRefreshService {
  private refreshTimer: NodeJS.Timeout | null = null;
  private isRefreshing = false;
  private refreshPromise: Promise<boolean> | null = null;

  /**
   * Start proactive token refresh
   * Refreshes token every 12 minutes (3 minutes before 15-minute expiry)
   */
  start() {
    if (typeof window === 'undefined') return;
    
    // Clear any existing timer
    this.stop();
    
    // Refresh every 12 minutes (720,000 ms)
    this.refreshTimer = setInterval(() => {
      this.refreshTokenIfNeeded();
    }, 12 * 60 * 1000);
    
    console.log('🔄 Token refresh service started');
  }

  /**
   * Stop proactive token refresh
   */
  stop() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
    console.log('⏹️ Token refresh service stopped');
  }

  /**
   * Refresh token if needed (with debouncing)
   */
  private async refreshTokenIfNeeded(): Promise<boolean> {
    // Prevent multiple simultaneous refresh attempts
    if (this.isRefreshing) {
      return this.refreshPromise ?? Promise.resolve(false);
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performRefresh();
    
    try {
      const success = await this.refreshPromise;
      return success;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  /**
   * Perform the actual token refresh
   */
  private async performRefresh(): Promise<boolean> {
    try {
      console.log('🔄 Refreshing token proactively...');
      
      const response = await apiHelpers.post('/auth/refresh');
      
      if (response.status === 200) {
        console.log('✅ Token refreshed successfully');
        return true;
      } else {
        console.warn('⚠️ Token refresh returned non-200 status:', response.status);
        return false;
      }
    } catch (error) {
      console.warn('⚠️ Proactive token refresh failed:', error);
      return false;
    }
  }

  /**
   * Force refresh token immediately
   */
  async forceRefresh(): Promise<boolean> {
    return this.refreshTokenIfNeeded();
  }
}

// Export singleton instance
export const tokenRefreshService = new TokenRefreshService();

// Auto-start when module loads (in browser only)
if (typeof window !== 'undefined') {
  // Start after a short delay to ensure the app is fully loaded
  setTimeout(() => {
    tokenRefreshService.start();
  }, 5000);
}
