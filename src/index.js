import express from 'express';
import cors from 'cors';

const proxy = {
  app: express(),
  server: null,
  routes: new Map(),
  
  start(port = 3000) {
    this.app.use(express.json());
    this.app.use(cors());

    this.setupRoutes();
    
    this.server = this.app.listen(port, () => {
      console.log(`Proxy server running on http://localhost:${port}`);
    });
    return this;
  },
  

  stop() {
    if (this.server) {
      this.server.close();
      console.log('Proxy server stopped');
    }
    return this;
  },
  

  addRoute(localPath, targetUrl, options = {}) {
    this.routes.set(localPath, { targetUrl, options });
    
    if (this.server) {
      this.setupRoute(localPath, targetUrl, options);
    }
    return this;
  },

  setupRoutes() {
    for (const [path, config] of this.routes.entries()) {
      this.setupRoute(path, config.targetUrl, config.options);
    }
  },

  setupRoute(localPath, targetUrl, options = {}) {
    const method = (options.method || 'GET').toLowerCase();
    
    this.app[method](localPath, async (req, res) => {
      try {
        const requestOptions = {
          method: options.method || 'GET',
          headers: options.headers || {},
          ...options
        };
        if (method !== 'get' && req.body && Object.keys(req.body).length > 0) {
          requestOptions.body = JSON.stringify(req.body);
          if (!requestOptions.headers['content-type']) {
            requestOptions.headers['content-type'] = 'application/json';
          }
        }
        const queryString = new URLSearchParams(req.query).toString();
        const urlWithQuery = queryString ? `${targetUrl}?${queryString}` : targetUrl;
        const response = await fetch(urlWithQuery, requestOptions);
        
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.error(`Error proxying request to ${targetUrl}:`, error);
        res.status(500).json({ error: error.message });
      }
    });
  }
};

export { proxy };