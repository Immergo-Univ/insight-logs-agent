/**
 * Insight Logger for React Native
 * Console override library that sends logs to a remote logging service
 * 
 * Usage:
 * import insightLogger from './insight-logger.js';
 * insightLogger.init({
 *   logServerUrl: 'https://your-server.com',
 *   service: 'your-service',
 *   environment: 'prod',
 *   client: 'default-client-id'
 * });
 */

class InsightLogger {
  constructor() {
    this.config = {
      logServerUrl: '',
      service: '',
      environment: 'dev',
      client: 'default'
    };
    this.traceId = this.generateTraceId();
    this.originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug
    };
    this.isInitialized = false;
  }

  init(options = {}) {
    try {
      this.config = { ...this.config, ...options };
      if (!this.config.logServerUrl) {
        console.error('InsightLogger: logServerUrl is required');
        return;
      }
      
      this.overrideConsole();
      this.isInitialized = true;
    } catch (error) {
      // Fail silently to avoid breaking the application
    }
  }

  generateTraceId() {
    try {
      return 'trace-' + Math.random().toString(36).substr(2, 16) + '-' + Date.now();
    } catch (error) {
      return 'trace-fallback-' + Date.now();
    }
  }

  getStackTrace() {
    try {
      const stack = new Error().stack;
      if (!stack) return 'unknown:0';
      
      const lines = stack.split('\n');
      // Find the first line that doesn't contain this file
      for (let i = 2; i < lines.length; i++) {
        if (lines[i] && !lines[i].includes('insight-logger') && !lines[i].includes('at Object.log')) {
          // React Native stack traces can vary by platform
          // iOS: functionName@file:line:column
          const iosMatch = lines[i].match(/@(.+):(\d+):\d+/);
          if (iosMatch) {
            return `${iosMatch[1]}:${iosMatch[2]}`;
          }
          
          // Android: at functionName (file:line:column)
          const androidMatch = lines[i].match(/at .+\((.+):(\d+):\d+\)/);
          if (androidMatch) {
            return `${androidMatch[1]}:${androidMatch[2]}`;
          }
          
          // Alternative format: at file:line:column
          const altMatch = lines[i].match(/at (.+):(\d+):\d+/);
          if (altMatch) {
            return `${altMatch[1]}:${altMatch[2]}`;
          }
          
          // Hermes format: functionName (file:line:column)
          const hermesMatch = lines[i].match(/(.+) \((.+):(\d+):\d+\)/);
          if (hermesMatch) {
            return `${hermesMatch[2]}:${hermesMatch[3]}`;
          }
        }
      }
      return 'unknown:0';
    } catch (error) {
      return 'unknown:0';
    }
  }

  parseArguments(args) {
    try {
      let content = '';
      let client = this.config.client;
      let level = 'INFO';

      if (args.length === 0) {
        content = '';
      } else if (args.length === 1) {
        content = this.stringifyContent(args[0]);
      } else if (args.length === 2) {
        content = this.stringifyContent(args[0]);
        
        // Check if second argument is a valid config object with client or level
        if (typeof args[1] === 'object' && args[1] !== null && !Array.isArray(args[1])) {
          if (args[1].hasOwnProperty('client') || args[1].hasOwnProperty('level')) {
            if (args[1].client) client = args[1].client;
            if (args[1].level) level = args[1].level;
          } else {
            content += ' [Object]';
          }
        } else {
          content += ' ' + this.stringifyContent(args[1]);
        }
      } else {
        // Multiple arguments - stringify all
        content = args.map(arg => this.stringifyContent(arg)).join(' ');
      }

      return { content, client, level };
    } catch (error) {
      return { 
        content: '[Error parsing arguments]', 
        client: this.config.client, 
        level: 'ERROR' 
      };
    }
  }

  stringifyContent(arg) {
    try {
      if (typeof arg === 'string') return arg;
      if (typeof arg === 'number') return arg.toString();
      if (typeof arg === 'boolean') return arg.toString();
      if (arg === null) return 'null';
      if (arg === undefined) return 'undefined';
      if (typeof arg === 'object') return '[Object]';
      return String(arg);
    } catch (error) {
      return '[Object]';
    }
  }

  sendLog(logData) {
    try {
      if (!this.isInitialized || !this.config.logServerUrl) return;

      // Construct URL with query parameters
      const baseUrl = this.config.logServerUrl.endsWith('/') 
        ? this.config.logServerUrl.slice(0, -1) 
        : this.config.logServerUrl;
      
      const params = new URLSearchParams({
        client: logData.client || this.config.client,
        content: logData.content || '',
        label: logData.label || '',
        level: logData.level || 'INFO',
        service: this.config.service || '',
        environment: this.config.environment || 'dev',
        value: this.traceId
      }).toString();

      const url = `${baseUrl}/event?${params}`;

      // Use fetch for React Native
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'InsightLogger-ReactNative/1.0'
        },
        // React Native doesn't support timeout in fetch directly
      }).catch(() => {
        // Fail silently to avoid breaking the application
      });

    } catch (error) {
      // Fail silently to avoid breaking the application
    }
  }

  createConsoleOverride(originalMethod, level) {
    return (...args) => {
      try {
        // Always call original console method first
        originalMethod.apply(console, args);

        if (this.isInitialized) {
          const { content, client, level: parsedLevel } = this.parseArguments(args);
          const label = this.getStackTrace();

          this.sendLog({
            content,
            client,
            level: level || parsedLevel,
            label
          });
        }
      } catch (error) {
        // If anything fails, just call the original method
        try {
          originalMethod.apply(console, args);
        } catch (e) {
          // Ultimate fallback - do nothing to avoid breaking the app
        }
      }
    };
  }

  overrideConsole() {
    try {
      console.log = this.createConsoleOverride(this.originalConsole.log, 'INFO');
      console.error = this.createConsoleOverride(this.originalConsole.error, 'ERROR');
      console.warn = this.createConsoleOverride(this.originalConsole.warn, 'WARNING');
      console.info = this.createConsoleOverride(this.originalConsole.info, 'INFO');
      console.debug = this.createConsoleOverride(this.originalConsole.debug, 'DEBUG');
    } catch (error) {
      // Fail silently to avoid breaking the application
    }
  }

  restore() {
    try {
      console.log = this.originalConsole.log;
      console.error = this.originalConsole.error;
      console.warn = this.originalConsole.warn;
      console.info = this.originalConsole.info;
      console.debug = this.originalConsole.debug;
      this.isInitialized = false;
    } catch (error) {
      // Fail silently
    }
  }
}

// Export singleton instance
const insightLogger = new InsightLogger();

export default insightLogger;

