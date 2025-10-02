/**
 * Node.js Example - Explicit Platform Selection
 * 
 * This example shows how to use the insight-logger in a Node.js application
 * with explicit platform selection.
 */

// Explicitly import the Node.js implementation
const insightLogger = require('insight-log-agent/nodejs');

// Initialize the logger
insightLogger.init({
  logServerUrl: 'https://your-logging-server.com',
  service: 'my-nodejs-app',
  environment: 'production',
  client: 'default-client'
});

console.log('Platform detected:', insightLogger._platform);
console.log('Version:', insightLogger._version);

// Example usage - basic logging
console.log('Application started successfully');
console.error('This is an error message');
console.warn('This is a warning message');

// Example usage - with custom client and level
console.log('User login attempt', { client: 'user-123', level: 'INFO' });
console.error('Failed authentication', { client: 'user-456', level: 'ERROR' });

// Example usage - multiple arguments
console.log('Processing order:', 'ORDER-789', 'for client:', 'TENANT-ABC');

// Example usage - with objects (will be logged as [Object])
console.log('User data:', { name: 'John', age: 30 });

// Example function to show stack trace
function processPayment() {
  console.log('Processing payment in function');
  console.error('Payment failed in nested function');
}

processPayment();

console.log('Example completed - check your logging server for entries');

