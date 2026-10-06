import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { AIChatView } from './components/AIChatView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { TextSearchView } from './components/TextSearchView';
import { PoliticalWorkView } from './components/PoliticalWorkView';
import { PropagandaAudioView } from './components/PropagandaAudioView';
import { VideoEditorView } from './components/VideoEditorView';
import { ImageProcessingView } from './components/ImageProcessingView';
import { UtilitiesView } from './components/UtilitiesView';
import { SettingsView } from './components/SettingsView';
import { ActiveTab, SettingsState } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [settings, setSettings] = useState<SettingsState>({
    lmStudioUrl: 'http://localhost:1234/v1',
    modelName: 'qwen2.5-7b-instruct',
    temperature: 0.7,
    systemPrompt: 'Bạn là trợ lý AI chuyên nghiệp của Lữ đoàn 162, Vùng 4 Hải Quân. Hãy đưa ra câu trả lời chính xác, đúng đắn, kiên quyết bảo vệ chủ quyền biển đảo theo pháp luật Việt Nam và quốc tế.',
    autoConnect: true
  });

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header activeTab={activeTab} />

        <main className="flex-1 overflow-y-auto">
          {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
          {activeTab === 'chat' && <AIChatView settings={settings} goToSettings={() => setActiveTab('settings')} />}
          {activeTab === 'knowledge' && <KnowledgeBaseView />}
          {activeTab === 'search' && <TextSearchView />}
          {activeTab === 'political' && <PoliticalWorkView />}
          {activeTab === 'propaganda' && <PropagandaAudioView />}
          {activeTab === 'video' && <VideoEditorView />}
          {activeTab === 'image' && <ImageProcessingView />}
          {activeTab === 'utilities' && <UtilitiesView />}
          {activeTab === 'settings' && <SettingsView settings={settings} onSaveSettings={setSettings} />}
        </main>
      </div>
    </div>
  );
}
