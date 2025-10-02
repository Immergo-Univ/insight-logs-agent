/**
 * ReactJS Example - Explicit Platform Selection
 * 
 * This example shows how to use the insight-logger in a React application
 * with explicit platform selection.
 */

import React, { useEffect } from 'react';
// Explicitly import the ReactJS implementation
import insightLogger from 'insight-log-agent/reactjs';

// Initialize the logger (typically done in your main app component or index.js)
insightLogger.init({
  logServerUrl: 'https://your-logging-server.com',
  service: 'my-react-app',
  environment: 'production',
  client: 'default-client'
});

console.log('Platform detected:', insightLogger._platform);
console.log('Version:', insightLogger._version);

function ExampleComponent() {
  useEffect(() => {
    // Basic logging
    console.log('Component mounted');
    console.error('Example error in useEffect');
    console.warn('Example warning in useEffect');
    
    // With custom client and level
    console.log('User interaction', { client: 'tenant-123', level: 'INFO' });
  }, []);

  const handleClick = () => {
    // Logging with custom parameters
    console.log('Button clicked', { client: 'user-456', level: 'DEBUG' });
  };

  const handleError = () => {
    try {
      throw new Error('Intentional error for testing');
    } catch (error) {
      console.error('Caught error:', error.message, { client: 'error-tracker', level: 'ERROR' });
    }
  };

  const handleAsyncOperation = async () => {
    console.log('Starting async operation');
    
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Async operation completed', { client: 'async-ops', level: 'SUCCESS' });
    } catch (error) {
      console.error('Async operation failed', { client: 'async-ops', level: 'ERROR' });
    }
  };

  return (
    <div>
      <h1>Insight Logger React Example</h1>
      <p>Platform: {insightLogger._platform}</p>
      <p>Version: {insightLogger._version}</p>
      <button onClick={handleClick}>Log Click Event</button>
      <button onClick={handleError}>Trigger Error</button>
      <button onClick={handleAsyncOperation}>Start Async Operation</button>
    </div>
  );
}

export default ExampleComponent;

