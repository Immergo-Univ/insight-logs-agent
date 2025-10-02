/**
 * React Native Example - Insight Logger Usage
 * 
 * This example shows how to use the insight-logger in a React Native application
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import insightLogger from './insight-logger';

// Initialize the logger (typically done in your App.js or index.js)
insightLogger.init({
  logServerUrl: 'https://your-logging-server.com',
  service: 'my-react-native-app',
  environment: 'production',
  client: 'mobile-client'
});

const ExampleScreen = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Basic logging on component mount
    console.log('ExampleScreen component mounted');
    console.warn('This is a warning from React Native');
    
    // Log with custom parameters
    console.log('Screen initialized', { client: 'mobile-user', level: 'INFO' });
  }, []);

  const handleIncrement = () => {
    setCounter(prev => prev + 1);
    console.log('Counter incremented', { client: 'counter-app', level: 'DEBUG' });
  };

  const handleError = () => {
    try {
      // Simulate an error
      throw new Error('Test error from React Native');
    } catch (error) {
      console.error('Error occurred:', error.message, { client: 'error-handler', level: 'ERROR' });
      Alert.alert('Error', 'Check your logs - error was logged to server');
    }
  };

  const handleAsyncOperation = async () => {
    console.log('Starting async operation in React Native');
    
    try {
      // Simulate network request or async operation
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await response.json();
      
      console.log('API call successful', { client: 'api-client', level: 'SUCCESS' });
      Alert.alert('Success', 'Check your logs - API call was logged');
    } catch (error) {
      console.error('API call failed', { client: 'api-client', level: 'ERROR' });
      Alert.alert('Error', 'API call failed - check logs');
    }
  };

  const handleMultipleArgs = () => {
    console.log('Multiple arguments:', counter, 'current user:', 'john_doe', 'timestamp:', Date.now());
  };

  const handleObjectLogging = () => {
    const userData = { name: 'John', age: 30, role: 'admin' };
    console.log('Logging object:', userData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insight Logger React Native Example</Text>
      
      <Text style={styles.counter}>Counter: {counter}</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>Increment & Log</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleError}>
        <Text style={styles.buttonText}>Trigger Error</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleAsyncOperation}>
        <Text style={styles.buttonText}>Async Operation</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleMultipleArgs}>
        <Text style={styles.buttonText}>Multiple Args</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleObjectLogging}>
        <Text style={styles.buttonText}>Log Object</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  counter: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    minWidth: 200,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ExampleScreen;

