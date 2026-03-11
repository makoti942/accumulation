#!/usr/bin/env python3
"""
Enhanced HTTP Server for Deriv Accumulator AI Sniper Pro
- Serves index.html and static assets
- Includes connection monitoring and error handling
- Supports CORS for WebSocket connections
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path
import json
from datetime import datetime

PORT = 5000
HOST = '0.0.0.0'

class EnhancedHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Enhanced HTTP handler with logging and CORS support"""
    
    def do_GET(self):
        """Handle GET requests with enhanced logging"""
        # Log request
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f"[{timestamp}] GET {self.path} from {self.client_address[0]}")
        
        # Serve index.html for root and SPA routes
        if self.path == '/' or self.path.endswith('.html'):
            self.path = '/index.html'
        
        # Call parent handler
        try:
            super().do_GET()
        except Exception as e:
            print(f"[ERROR] GET {self.path}: {e}")
            self.send_error(500, "Internal Server Error")
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
    
    def end_headers(self):
        """Add CORS headers to all responses"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def log_message(self, format, *args):
        """Override logging to include timestamps"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f"[{timestamp}] {format % args}")

def run_server():
    """Start the HTTP server with connection monitoring"""
    os.chdir(Path(__file__).parent)
    
    # Create server
    handler = EnhancedHTTPRequestHandler
    with socketserver.TCPServer((HOST, PORT), handler) as httpd:
        print(f"\n{'='*60}")
        print(f"🚀 Deriv Accumulator AI Sniper Pro - HTTP Server")
        print(f"{'='*60}")
        print(f"📍 Server running on: http://{HOST}:{PORT}")
        print(f"📂 Serving from: {os.getcwd()}")
        print(f"⏱️  Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"{'='*60}\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n[INFO] Server shutting down...")
        except Exception as e:
            print(f"\n[ERROR] Server error: {e}")
            sys.exit(1)

if __name__ == '__main__':
    run_server()
