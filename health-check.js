/**
 * Connection Health Check Utility
 * Monitors WebSocket and HTTP connectivity (read-only — reconnection is managed by the main app)
 */

const ConnectionHealthCheck = {
  wsStatus: 'DISCONNECTED',
  httpStatus: 'UNKNOWN',
  lastCheckTime: null,
  checkInterval: 30000,

  init: function() {
    console.log('[HealthCheck] Initializing connection monitoring...');
    this.startMonitoring();
  },

  startMonitoring: function() {
    setInterval(() => {
      this.checkWebSocketHealth();
      this.reportStatus();
    }, this.checkInterval);
  },

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

  reportStatus: function() {
    this.lastCheckTime = new Date().toLocaleTimeString();
    if (this.wsStatus !== 'CONNECTED') {
      console.warn('[HealthCheck] ' + this.lastCheckTime + ' - WS: ' + this.wsStatus);
    }
    // NOTE: Do NOT call connect() here. The main app manages its own reconnection
    // via schedReconn(). Calling connect() from here would disrupt the auth flow.
  },

  getStatus: function() {
    return {
      websocket: this.wsStatus,
      lastCheck: this.lastCheckTime,
      timestamp: new Date().toISOString()
    };
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { ConnectionHealthCheck.init(); });
} else {
  ConnectionHealthCheck.init();
}
