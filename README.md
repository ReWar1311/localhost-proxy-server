# Localhost Proxy

A simple proxy server that runs on localhost and forwards requests to external APIs.

## Installation

```bash
npm install localhost-proxy-server
```

## Usage

```javascript
import { proxy } from 'localhost-proxy-server';

// Start the proxy server on port 3000
proxy.start(3000);

// Add a route to proxy requests
proxy.addRoute('/api/data', 'https://api.example.com/data', {
  method: 'POST',
  headers: {
    'authorization': 'Bearer your-token',
    'content-type': 'application/json'
  }
});

// You can add multiple routes
proxy.addRoute('/api/users', 'https://api.example.com/users', { method: 'GET' });

// Stop the server when needed
// proxy.stop();
```

## API

### proxy.start(port)
Starts the proxy server on the specified port (default: 3000).

### proxy.stop()
Stops the proxy server.

### proxy.addRoute(localPath, targetUrl, options)
Adds a new route to the proxy server.

- `localPath`: The path on your localhost server (e.g., '/api/data')
- `targetUrl`: The actual URL to forward the request to
- `options`: Request options including:
  - `method`: HTTP method (GET, POST, etc.)
  - `headers`: Request headers
```

## License

MIT