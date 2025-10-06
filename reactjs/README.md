# Insight Logger - ReactJS

Library for overriding console.log that sends logs to a remote logging server in React applications.

## Installation

Simply copy the `insight-logger.js` file to your React project.

## Basic Usage

```javascript
import insightLogger from './insight-logger';

// Initialize the library (typically in App.js or index.js)
insightLogger.init({
  logServerUrl: 'https://your-logs-server.com',
  service: 'my-react-application',
  environment: 'prod',
  client: 'default-client'
});

// Use console.log normally - now it will send logs to the server
console.log('My log message');
console.error('Error message');
console.warn('Warning message');
```

## Usage in Components

```javascript
import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    console.log('Component mounted');
  }, []);

  const handleClick = () => {
    console.log('Button clicked', { 
      client: 'user-123', 
      level: 'INFO' 
    });
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

## Advanced Configuration

```javascript
// With custom parameters
console.log('Important event', { 
  client: 'tenant-123', 
  level: 'ERROR' 
});
```

## Features

- ✅ Override of console.log, console.error, console.warn, console.info, console.debug
- ✅ Maintains original console functionality
- ✅ Automatic stack trace to identify line of code
- ✅ Fault tolerant - never breaks the application
- ✅ Automatic TraceID for log tracking
- ✅ Support for individual log configuration
- ✅ Safe serialization of objects as [Object]
- ✅ Compatible with React DevTools
- ✅ Support for multiple browsers

## API

### insightLogger.init(options)

Initializes the logger with the specified configuration.

**Options:**
- `logServerUrl` (required): URL of the logs server
- `service`: Service name
- `environment`: Environment (dev, prod, etc.)
- `client`: Default client ID

### insightLogger.restore()

Restores original console behavior.

## Sent Fields

The library sends the following fields to the `/event` endpoint:

- `client`: Client ID
- `content`: Log content
- `label`: Stack trace with file and line
- `level`: Log level (INFO, ERROR, WARNING, DEBUG)
- `service`: Service name
- `environment`: Environment
- `value`: TraceID for tracking

## Production Considerations

- The library uses `fetch()` to send logs
- Logs are sent asynchronously without blocking the UI
- Automatically handles network errors without affecting the application
- CORS compatible (configure your server as needed)

