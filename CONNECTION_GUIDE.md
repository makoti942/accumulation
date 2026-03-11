# Connection Troubleshooting Guide

## Overview
This document provides solutions for common connection issues with the Deriv Accumulator AI Sniper Pro.

## WebSocket Connection Issues

### Issue 1: WebSocket Connection Fails
**Symptoms**: Red dot indicator, "Connection Failed" banner

**Solutions**:
1. Check browser console (F12) for error messages
2. Verify internet connection is stable
3. Check if Deriv API is accessible: `wss://ws.binaryws.com/websockets/v3`
4. Clear browser cache and cookies
5. Try a different browser
6. Check firewall/proxy settings

### Issue 2: Frequent Disconnections
**Symptoms**: Connection drops every few minutes

**Solutions**:
1. Check network stability
2. Reduce other network traffic
3. Check browser console for errors
4. Verify App ID is correct (129093)
5. Check if ISP is throttling WebSocket connections

### Issue 3: Slow Connection/Latency
**Symptoms**: Delayed price updates, slow trade execution

**Solutions**:
1. Check network latency
2. Use a VPN if in a region with poor connectivity
3. Close other bandwidth-heavy applications
4. Check browser performance (too many tabs)
5. Verify system resources (CPU, RAM)

## HTTP Server Issues

### Issue 1: Page Won't Load
**Symptoms**: Blank page or 404 error

**Solutions**:
1. Verify server is running: `python3 server.py`
2. Check if port 5000 is accessible
3. Verify firewall allows port 5000
4. Check browser console for errors
5. Clear browser cache

### Issue 2: Static Assets Not Loading
**Symptoms**: Page loads but styling/icons missing

**Solutions**:
1. Check browser console for 404 errors
2. Verify all files exist in the directory
3. Check file permissions
4. Verify relative paths in HTML
5. Try hard refresh (Ctrl+Shift+R)

## Authentication Issues

### Issue 1: Login Fails
**Symptoms**: Cannot authorize with Deriv account

**Solutions**:
1. Verify Deriv account credentials
2. Check if account is active
3. Clear stored tokens: Open DevTools → Application → Local Storage → Clear
4. Try logging in again
5. Check if OAuth redirect URL is correct

### Issue 2: Session Expires
**Symptoms**: "Session expired" message after some time

**Solutions**:
1. This is normal - re-login
2. Tokens expire after 24 hours
3. Check browser's local storage settings
4. Ensure cookies are enabled

## Monitoring Connection Health

### Using Built-in Health Check
The application includes automatic connection monitoring:
- Checks WebSocket status every 30 seconds
- Monitors HTTP connectivity
- Auto-reconnects if disconnected
- View status in browser console: `ConnectionHealthCheck.getStatus()`

### Manual Diagnostics
```javascript
// Check WebSocket status
console.log('WS Status:', ws.readyState);
// 0 = CONNECTING, 1 = OPEN, 2 = CLOSING, 3 = CLOSED

// Force reconnection
connect();

// Check connection health
ConnectionHealthCheck.getStatus();
```

## Network Requirements

### Minimum Requirements
- Stable internet connection (broadband recommended)
- Latency < 500ms to Deriv servers
- Upload/Download speed > 1 Mbps
- No aggressive firewall/proxy blocking WebSockets

### Recommended Setup
- Latency < 100ms
- Upload/Download speed > 10 Mbps
- Direct connection (no VPN if possible)
- Dedicated connection (not shared)

## Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 1000 | Normal closure | Reconnect |
| 1001 | Going away | Server restart |
| 1002 | Protocol error | Clear cache, retry |
| 1003 | Unsupported data | Check message format |
| 1006 | Abnormal closure | Check network |
| 1011 | Server error | Wait and retry |

## Performance Optimization

### Browser Settings
1. Enable hardware acceleration
2. Disable unnecessary extensions
3. Use latest browser version
4. Allocate sufficient RAM

### Network Optimization
1. Use wired connection if possible
2. Close VPN if not needed
3. Disable proxy if not needed
4. Monitor bandwidth usage

## Support Resources

- **Deriv API Docs**: https://developers.deriv.com/
- **WebSocket Status**: https://status.deriv.com/
- **Browser Console**: F12 → Console tab
- **Network Tab**: F12 → Network tab

---

**Last Updated**: 2026-03-11
**Version**: 1.0
