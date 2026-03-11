/**
 * Connection Health Check Utility
 * Monitors WebSocket and HTTP connectivity
 */

const ConnectionHealthCheck = {
  wsStatus: 'DISCONNECTED',
  httpStatus: 'UNKNOWN',
  lastCheckTime: null,
  checkInterval: 30000, // 30 seconds
  
  /**
   * Initialize health check monitoring
   */
  init: function() {
    console.log('[HealthCheck] Initializing connection monitoring...');
    this.startMonitoring();
  },
  
  /**
   * Start periodic health checks
   */
  startMonitoring: function() {
    setInterval(() => {
      this.checkWebSocketHealth();
      this.checkHTTPHealth();
      this.reportStatus();
    }, this.checkInterval);
  },
  
  /**
   * Check WebSocket connection health
   */
  checkWebSocketHealth: function() {
    if (typeof ws !== 'undefined' && ws) {
      if (ws.readyState === WebSocket.OPEN) {
        this.wsStatus = 'CONNECTED';
      } else if (ws.readyState === WebSocket.CONNECTING) {
        this.wsStatus = 'CONNECTING';
      } else if (ws.readyState === WebSocket.CLOSING) {
        this.wsStatus = 'CLOSING';
      } else {
        this.wsStatus = 'DISCONNECTED';
      }
    } else {
      this.wsStatus = 'NOT_INITIALIZED';
    }
  },
  
  /**
   * Check HTTP connection health
   */
  checkHTTPHealth: function() {
    fetch(window.location.href, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          this.httpStatus = 'HEALTHY';
        } else {
          this.httpStatus = 'ERROR_' + response.status;
        }
      })
      .catch(error => {
        this.httpStatus = 'FAILED';
        console.error('[HealthCheck] HTTP check failed:', error);
      });
  },
  
  /**
   * Report current connection status
   */
  reportStatus: function() {
    this.lastCheckTime = new Date().toLocaleTimeString();
    console.log(`[HealthCheck] ${this.lastCheckTime} - WS: ${this.wsStatus}, HTTP: ${this.httpStatus}`);
    
    // Trigger reconnection if WebSocket is disconnected
    if (this.wsStatus === 'DISCONNECTED' && typeof connect === 'function') {
      console.warn('[HealthCheck] WebSocket disconnected, attempting reconnection...');
      connect();
    }
  },
  
  /**
   * Get current status as object
   */
  getStatus: function() {
    return {
      websocket: this.wsStatus,
      http: this.httpStatus,
      lastCheck: this.lastCheckTime,
      timestamp: new Date().toISOString()
    };
  }
};

// Auto-initialize when document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ConnectionHealthCheck.init();
  });
} else {
  ConnectionHealthCheck.init();
}
