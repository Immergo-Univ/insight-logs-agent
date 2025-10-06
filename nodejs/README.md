# Insight Logger - Node.js

Library for overriding console.log that sends logs to a remote logging server.

## Installation

Simply copy the `insight-logger.js` file to your Node.js project.

## Basic Usage

```javascript
const insightLogger = require('./insight-logger');

// Initialize the library
insightLogger.init({
  logServerUrl: 'https://your-logs-server.com',
  service: 'my-nodejs-application',
  environment: 'prod',
  client: 'default-client'
});

// Use console.log normally - now it will send logs to the server
console.log('My log message');
console.error('Error message');
console.warn('Warning message');
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

