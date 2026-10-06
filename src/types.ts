export type ActiveTab = 
  | 'home'
  | 'chat'
  | 'knowledge'
  | 'search'
  | 'political'
  | 'propaganda'
  | 'video'
  | 'image'
  | 'utilities'
  | 'settings';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  provider?: string;
  recommendations?: string[];
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'phap_luat_bien' | 'unclos' | 'dieu_lenh' | 'ctd_ctct' | 'tin_tuc';
  summary: string;
  content: string;
  date: string;
  author: string;
  downloads: number;
}

export interface VideoClip {
  id: string;
  title: string;
  duration: number; // in seconds
  thumbnail: string;
  type: 'video' | 'image' | 'audio';
  src?: string;
}

export interface VideoTrackItem {
  id: string;
  clipId: string;
  title: string;
  startTime: number;
  duration: number;
  trackType: 'video' | 'audio' | 'text' | 'effect';
}

export interface SettingsState {
  lmStudioUrl: string;
  modelName: string;
  temperature: number;
  systemPrompt: string;
  autoConnect: boolean;
}
