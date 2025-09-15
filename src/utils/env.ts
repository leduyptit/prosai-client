/**
 * Environment Variables Utility
 * Centralized management of environment variables
 */

// Application Configuration
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'ProSai Client',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  environment: process.env.NEXT_PUBLIC_APP_ENV || 'development',
  debug: process.env.NEXT_PUBLIC_DEBUG === 'true',
  logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
  homeUrl: process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3000',
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  version: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
} as const;

// Authentication Configuration
export const AUTH_CONFIG = {
  url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-key',
  jwtSecret: process.env.JWT_SECRET || 'dev-jwt-secret',
} as const;

// Database Configuration
export const DATABASE_CONFIG = {
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  name: process.env.DATABASE_NAME || 'prosai_db',
  user: process.env.DATABASE_USER || 'username',
  password: process.env.DATABASE_PASSWORD || 'password',
} as const;

// Email Configuration
export const EMAIL_CONFIG = {
  provider: process.env.EMAIL_SERVICE_PROVIDER || 'sendgrid',
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  from: process.env.EMAIL_FROM || 'noreply@prosai.com',
  fromName: process.env.EMAIL_FROM_NAME || 'ProSai Client',
} as const;

// Storage Configuration
export const STORAGE_CONFIG = {
  provider: process.env.STORAGE_PROVIDER || 'aws',
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
    bucket: process.env.AWS_S3_BUCKET || 'prosai-client-storage',
  },
} as const;

// Third Party Services
export const THIRD_PARTY_CONFIG = {
  googleAnalytics: {
    id: process.env.NEXT_PUBLIC_GA_ID,
  },
  googleMaps: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  notifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
  darkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true',
  offlineMode: process.env.NEXT_PUBLIC_ENABLE_OFFLINE_MODE === 'true',
} as const;

// Performance & Security Configuration
export const PERFORMANCE_CONFIG = {
  maxFileSize: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760'),
  allowedFileTypes: process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES?.split(',') || [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
  ],
  rateLimit: {
    requests: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT_REQUESTS || '100'),
    window: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT_WINDOW || '900000'),
  },
} as const;

// Monitoring & Logging Configuration
export const MONITORING_CONFIG = {
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  logtail: {
    token: process.env.LOGTAIL_TOKEN,
  },
} as const;

// Environment Helper Functions
export const isDevelopment = () => process.env.NODE_ENV === 'development';
export const isProduction = () => process.env.NODE_ENV === 'production';
export const isTest = () => process.env.NODE_ENV === 'test';

export const getEnvironment = () => ({
  isDevelopment: isDevelopment(),
  isProduction: isProduction(),
  isTest: isTest(),
  nodeEnv: process.env.NODE_ENV || 'development',
});

// Validation Functions
export const validateRequiredEnvVars = (requiredVars: string[]) => {
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Environment-specific configurations
export const getConfigForEnvironment = () => {
  const env = getEnvironment();
  
  if (env.isProduction) {
    return {
      ...APP_CONFIG,
      ...API_CONFIG,
      ...AUTH_CONFIG,
      debug: false,
      logLevel: 'error',
    };
  }
  
  return {
    ...APP_CONFIG,
    ...API_CONFIG,
    ...AUTH_CONFIG,
    debug: true,
    logLevel: 'debug',
  };
};

// Minio CDN
export const MINIO_CDN_CONFIG = {
  endpointUrl: process.env.MINIO_ENDPOINT_URL || 'https://cdn.prosai.vn/',
} as const;

export default {
  APP_CONFIG,
  API_CONFIG,
  AUTH_CONFIG,
  DATABASE_CONFIG,
  EMAIL_CONFIG,
  STORAGE_CONFIG,
  THIRD_PARTY_CONFIG,
  FEATURE_FLAGS,
  PERFORMANCE_CONFIG,
  MONITORING_CONFIG,
  MINIO_CDN_CONFIG,
  getEnvironment,
  validateRequiredEnvVars,
  getConfigForEnvironment,
}; 