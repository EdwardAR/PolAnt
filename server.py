#!/usr/bin/env python3
"""Servidor HTTP local con MIME types correctos para ES modules."""

import http.server

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
    }

PORT = 8000
with http.server.HTTPServer(("", PORT), Handler) as httpd:
    print(f"Servidor corriendo en http://localhost:{PORT}")
    print("Presioná Ctrl+C para detenerlo.")
    httpd.serve_forever()
