/**
 * Insight Log Agent - ESM Entry Point
 * 
 * Installation from GitHub:
 * npm install github:tuusuario/insight-log-agent
 * 
 * IMPORTANT: You must explicitly choose your platform implementation:
 * 
 * For Node.js:
 * import insightLogger from 'insight-log-agent/nodejs';
 * 
 * For ReactJS:
 * import insightLogger from 'insight-log-agent/reactjs';
 * 
 * For React Native:
 * import insightLogger from 'insight-log-agent/react-native';
 * 
 * Usage:
 * insightLogger.init({ logServerUrl: 'https://your-server.com' });
 */

// This main entry point provides guidance and loads Node.js by default
// Users should explicitly import the platform-specific version they need

const insightLogger = require('./nodejs/insight-logger.js');

// Add warning for users who import the main entry
if (typeof insightLogger !== 'undefined') {
  insightLogger._platform = 'nodejs';
  insightLogger._version = '1.0.0';
  insightLogger._warning = 'You are using the default Node.js implementation. For ReactJS or React Native, explicitly import the platform-specific version.';
}

export default insightLogger;
