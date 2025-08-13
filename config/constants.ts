// Configuration constants and environment variables

// Supabase Configuration (Placeholder)
export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key',
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key'
};

// OpenAI Configuration (Placeholder)
export const OPENAI_CONFIG = {
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key',
  whisperModel: 'whisper-1',
  embeddingModel: 'text-embedding-ada-002'
};

// Authentication Configuration
export const AUTH_CONFIG = {
  jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret',
  tokenExpiry: '7d',
  refreshTokenExpiry: '30d'
};

// File Upload Configuration
export const UPLOAD_CONFIG = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedVideoTypes: ['video/mp4', 'video/webm', 'video/ogg'],
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  allowedDocumentTypes: ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  maxVideoDuration: 3600, // 1 hour in seconds
};

// Pagination Configuration
export const PAGINATION_CONFIG = {
  defaultPageSize: 10,
  maxPageSize: 100,
};

// Real-time Configuration
export const REALTIME_CONFIG = {
  channels: {
    notes: 'notes',
    classes: 'classes',
    homework: 'homework'
  }
};

// Application Settings
export const APP_CONFIG = {
  name: 'ClassSync',
  version: '1.0.0',
  description: 'Modern online learning platform',
  supportEmail: 'support@ClassSync.com',
  maxClassSize: 100,
  maxNotesPerClass: 1000,
  maxHomeworkPerClass: 50
};

// Feature Flags
export const FEATURES = {
  enableVideoTranscription: true,
  enableAISearch: true,
  enableRealtimeNotes: true,
  enableFileUploads: true,
  enableNotifications: true,
  enableAnalytics: false
};

// API Endpoints (Placeholder)
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh'
  },
  classes: {
    list: '/classes',
    create: '/classes',
    join: '/classes/join',
    leave: '/classes/leave'
  },
  notes: {
    list: '/notes',
    create: '/notes',
    update: '/notes/:id',
    delete: '/notes/:id',
    share: '/notes/:id/share'
  },
  homework: {
    list: '/homework',
    create: '/homework',
    submit: '/homework/:id/submit',
    grade: '/homework/:id/grade'
  },
  transcription: {
    transcribe: '/transcribe',
    search: '/search/transcripts'
  },
  upload: {
    file: '/upload',
    video: '/upload/video',
    document: '/upload/document'
  }
};