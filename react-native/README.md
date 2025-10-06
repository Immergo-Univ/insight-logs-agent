# Insight Logger - React Native

Library for overriding console.log that sends logs to a remote logging server in React Native applications.

## Installation

Simply copy the `insight-logger.js` file to your React Native project.

## Basic Usage

```javascript
import insightLogger from './insight-logger';

// Initialize the library (typically in App.js or index.js)
insightLogger.init({
  logServerUrl: 'https://your-logs-server.com',
  service: 'my-react-native-app',
  environment: 'prod',
  client: 'mobile-client'
});

// Use console.log normally - now it will send logs to the server
console.log('My log message');
console.error('Error message');
console.warn('Warning message');
```

## Usage in Components

```javascript
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function MyComponent() {
  useEffect(() => {
    console.log('Component mounted in React Native');
  }, []);

  const handlePress = () => {
    console.log('Button pressed', { 
      client: 'user-mobile-123', 
      level: 'INFO' 
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>Press</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Advanced Configuration

```javascript
// With custom parameters
console.log('Important event', { 
  client: 'tenant-mobile-123', 
  level: 'ERROR' 
});
```

## Features

- ✅ Override of console.log, console.error, console.warn, console.info, console.debug
- ✅ Maintains original console functionality
- ✅ Automatic stack trace optimized for React Native
- ✅ Fault tolerant - never breaks the application
- ✅ Automatic TraceID for log tracking
- ✅ Support for individual log configuration
- ✅ Safe serialization of objects as [Object]
- ✅ Compatible with Flipper and debugging tools
- ✅ Support for iOS and Android
- ✅ Support for different engines (Hermes, JSC)

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

## React Native Considerations

- The library uses React Native's native `fetch()`
- Stack traces automatically adapt to the JavaScript engine used
- Compatible with Metro bundler
- Logs are sent asynchronously without blocking the UI
- Automatically handles network errors
- Works in both development and production

## Debugging

- Original logs still appear in Metro/Flipper
- Stack traces include specific source file information
- Compatible with source maps for debugging

