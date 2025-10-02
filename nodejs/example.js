/**
 * Node.js Example - Insight Logger Usage
 * 
 * This example shows how to use the insight-logger in a Node.js application
 */

const insightLogger = require('./insight-logger');

// Initialize the logger
insightLogger.init({
  logServerUrl: 'https://your-logging-server.com',
  service: 'my-nodejs-app',
  environment: 'production',
  client: 'default-client'
});

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

