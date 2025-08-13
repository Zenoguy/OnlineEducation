// Placeholder API client for future integrations
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string) {
    // Placeholder - integrate with Supabase auth
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any) {
    // Placeholder - integrate with Supabase auth
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Classes
  async getClasses() {
    // Placeholder - integrate with Supabase
    return this.request('/classes');
  }

  async createClass(classData: any) {
    // Placeholder - integrate with Supabase
    return this.request('/classes', {
      method: 'POST',
      body: JSON.stringify(classData),
    });
  }

  async joinClass(code: string) {
    // Placeholder - integrate with Supabase
    return this.request('/classes/join', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  // Notes
  async getNotes(classId?: string) {
    // Placeholder - integrate with Supabase and realtime subscriptions
    const endpoint = classId ? `/notes?classId=${classId}` : '/notes';
    return this.request(endpoint);
  }

  async createNote(noteData: any) {
    // Placeholder - integrate with Supabase realtime
    return this.request('/notes', {
      method: 'POST',
      body: JSON.stringify(noteData),
    });
  }

  async updateNote(noteId: string, noteData: any) {
    // Placeholder - integrate with Supabase realtime
    return this.request(`/notes/${noteId}`, {
      method: 'PUT',
      body: JSON.stringify(noteData),
    });
  }

  // Homework
  async getHomework(classId?: string) {
    // Placeholder - integrate with Supabase
    const endpoint = classId ? `/homework?classId=${classId}` : '/homework';
    return this.request(endpoint);
  }

  async createHomework(homeworkData: any) {
    // Placeholder - integrate with Supabase
    return this.request('/homework', {
      method: 'POST',
      body: JSON.stringify(homeworkData),
    });
  }

  async submitHomework(homeworkId: string, submissionData: any) {
    // Placeholder - integrate with Supabase and file uploads
    return this.request(`/homework/${homeworkId}/submit`, {
      method: 'POST',
      body: JSON.stringify(submissionData),
    });
  }

  // Video Transcription
  async transcribeVideo(videoUrl: string) {
    // Placeholder - integrate with OpenAI Whisper API
    return this.request('/transcribe', {
      method: 'POST',
      body: JSON.stringify({ videoUrl }),
    });
  }

  // AI Search
  async searchTranscripts(query: string, classId?: string) {
    // Placeholder - integrate with OpenAI embeddings and Supabase pgvector
    const endpoint = '/search/transcripts';
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify({ query, classId }),
    });
  }

  // File upload
  async uploadFile(file: File, path: string) {
    // Placeholder - integrate with Supabase Storage
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    return this.request('/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Remove Content-Type header to let browser set it with boundary
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    });
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }
}

export const apiClient = new ApiClient();