export interface Slide {
  id: number;
  speaker: string;
  title: string;
  subtitle?: string;
  type?: 'hero' | 'problem' | 'solution' | 'feature' | 'neutral' | 'neural' | 'demo' | 'conclusion';
  bgPreset?: 'cosmic' | 'waves' | 'grid' | 'network' | 'none';
}

export interface PresetCall {
  id: string;
  title: string;
  description: string;
  audioDuration: string;
  agentName: string;
  type: 'sale' | 'complaint' | 'lead';
  qaScore: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  classifiedAs: 'Sales Problem' | 'No Clear Problem' | 'Mixed Problem' | 'Marketing Problem';
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
  transcript: Array<{
    speaker: 'Agent' | 'Customer';
    time: string;
    text: string;
  }>;
}
