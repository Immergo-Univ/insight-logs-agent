# Insight Log Agent

Universal logging library that overrides `console.log` to send logs to a remote server, available for multiple frameworks with explicit platform selection.

## 🚀 Installation from GitHub

```bash
# Direct installation from GitHub
npm install github:yourusername/insight-log-agent

# Or using the complete URL
npm install https://github.com/yourusername/insight-log-agent.git

# Specifying specific branch
npm install github:yourusername/insight-log-agent#main
```

## 📁 Repository Structure

```
insight-log-agent/
├── index.js              # Main entry point (auto-detection)
├── index.esm.js          # ESM version
├── index.d.ts            # TypeScript definitions
├── nodejs/               # Node.js implementation
├── reactjs/              # ReactJS implementation
├── react-native/         # React Native implementation
├── package.json          # NPM configuration
└── README.md             # This file
```

## 🎯 Supported Frameworks

- **Node.js** - Server-side applications
- **ReactJS** - React web applications  
- **React Native** - React Native mobile applications
- **Explicit Selection** - You must explicitly choose your platform implementation

## 📋 Main Features

- ✅ **Non-intrusive override** - Maintains original console functionality
- ✅ **Automatic stack trace** - Automatically identifies file and line of code
- ✅ **Fault tolerant** - Never breaks the application, fails silently
- ✅ **Automatic TraceID** - Log tracking across microservices
- ✅ **Flexible configuration** - Customizable parameters per log
- ✅ **Multiple levels** - INFO, ERROR, WARNING, DEBUG
- ✅ **Safe serialization** - Objects are displayed as [Object]

## 🛠️ Basic Usage

### Installation

```bash
# Install from GitHub
npm install github:yourusername/insight-log-agent
```

### Explicit Platform Selection

**⚠️ IMPORTANT: You must explicitly choose your platform implementation**

#### For Node.js
```javascript
const insightLogger = require('insight-log-agent/nodejs');
// or for ES6 modules:
// import insightLogger from 'insight-log-agent/nodejs';

insightLogger.init({
  logServerUrl: 'https://your-logs-server.com',
  service: 'my-nodejs-application',
  environment: 'prod',
  client: 'default-client'
});
```

#### For ReactJS
```javascript
const insightLogger = require('insight-log-agent/reactjs');
// or for ES6 modules:
// import insightLogger from 'insight-log-agent/reactjs';

insightLogger.init({
  logServerUrl: 'https://your-logs-server.com',
  service: 'my-react-application',
  environment: 'prod',
  client: 'default-client'
});
```

#### For React Native
```javascript
const insightLogger = require('insight-log-agent/react-native');
// or for ES6 modules:
// import insightLogger from 'insight-log-agent/react-native';

insightLogger.init({
  logServerUrl: 'https://your-logs-server.com',
  service: 'my-react-native-app',
  environment: 'prod',
  client: 'mobile-client'
});
```

### Normal Usage (After Initialization)

```javascript
// Use console.log normally - now it will send logs to the server
console.log('My message');
console.error('Error occurred');
console.warn('Warning message');

// With custom configuration
console.log('Important event', { 
  client: 'tenant-123', 
  level: 'ERROR' 
});
```

## 🔧 Server API

The library sends logs via GET to the `/event` endpoint with the following parameters:

### Main Parameters
- `client` - Client/tenant ID
- `content` - Log content
- `label` - Stack trace with file:line
- `level` - Log level (INFO, ERROR, WARNING, DEBUG)
- `service` - Service name
- `environment` - Environment (dev, prod, etc.)
- `value` - TraceID for tracking

## 🎯 Explicit Platform Selection

**No auto-detection** - You must explicitly choose the correct implementation:

- **Node.js**: `require('insight-log-agent/nodejs')`
- **ReactJS**: `require('insight-log-agent/reactjs')`  
- **React Native**: `require('insight-log-agent/react-native')`

### Why Explicit Selection?

✅ **Total control** - You know exactly which implementation you're using  
✅ **No surprises** - No automatic detection that could fail  
✅ **Better performance** - Only loads necessary code  
✅ **Clear debugging** - It's obvious which platform you're using  
✅ **Compatibility** - Works with all bundlers and environments  

### Platform Verification

```javascript
// See which implementation you're using
console.log('Platform:', insightLogger._platform);
console.log('Version:', insightLogger._version);
```

## 📖 Documentation by Framework

Each implementation has its specific documentation:

- [Node.js Documentation](./nodejs/README.md)
- [ReactJS Documentation](./reactjs/README.md)  
- [React Native Documentation](./react-native/README.md)

## 🎯 Use Cases

### Application Monitoring
```javascript
console.error('Database connection failed', { 
  client: 'db-monitor', 
  level: 'CRITICAL' 
});
```

### User Tracking
```javascript
console.log('User login', { 
  client: 'user-analytics', 
  level: 'INFO' 
});
```

### Distributed Debugging
```javascript
// The same traceID propagates automatically
console.log('Processing in service A');
// ... call to service B ...
console.log('Processing in service B'); // Same traceID
```

## 🔒 Fault Tolerance

- **Never breaks the application** - All errors are captured silently
- **Robust fallback** - If remote logging fails, console works normally
- **No external dependencies** - Self-contained code, no additional libraries
- **No local storage** - Doesn't assume localStorage/filesystem availability

## ⚙️ Server Configuration

The server must handle GET requests to the `/event` endpoint with parameters as query strings:

```
GET /event?client=tenant-123&content=my%20log&level=INFO&service=my-app&environment=prod&value=trace-abc&label=app.js:42
```

## 📝 Included Examples

Each framework includes complete example files:
- `nodejs/example.js`
- `reactjs/example.js`  
- `react-native/example.js`

## 🚀 Installation and Configuration

### 1. Create GitHub Repository

```bash
# Create repo on GitHub and clone
git clone https://github.com/yourusername/insight-log-agent.git
cd insight-log-agent

# Upload files
git add .
git commit -m "Initial commit: Universal console logging library"
git push origin main
```

### 2. Install in Projects

```bash
# In any Node.js/React/React Native project
npm install github:yourusername/insight-log-agent

# Or using complete URL
npm install https://github.com/yourusername/insight-log-agent.git
```

### 3. Immediate Usage

```javascript
// Choose the correct implementation for your platform
const insightLogger = require('insight-log-agent/nodejs'); // For Node.js
// const insightLogger = require('insight-log-agent/reactjs'); // For ReactJS
// const insightLogger = require('insight-log-agent/react-native'); // For React Native

insightLogger.init({ logServerUrl: 'https://your-server.com' });
console.log('It works!'); // Automatically sent to the server
```

## 🔧 Advanced Configuration

### Multiple Instances

```javascript
// Use different implementations in the same project if necessary
const nodeLogger = require('insight-log-agent/nodejs');
const reactLogger = require('insight-log-agent/reactjs');
const rnLogger = require('insight-log-agent/react-native');
```

### Implementation Verification

```javascript
// Verify which implementation you're using
console.log('Platform:', insightLogger._platform);
console.log('Version:', insightLogger._version);

// If you use the main entry point by mistake, you'll see a warning
if (insightLogger._warning) {
  console.warn(insightLogger._warning);
}
```

