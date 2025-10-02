/**
 * Insight Log Agent - TypeScript Definitions
 * Universal console logging library for Node.js, ReactJS, and React Native
 */

export interface LogConfig {
  client?: string;
  level?: 'INFO' | 'ERROR' | 'WARNING' | 'DEBUG';
}

export interface InsightConfig {
  logServerUrl: string;
  service?: string;
  environment?: string;
  client?: string;
}

export interface InsightLogger {
  init(config: InsightConfig): void;
  restore(): void;
  isInitialized: boolean;
  _platform?: string;
  _version?: string;
}

declare const insightLogger: InsightLogger;
export default insightLogger;

