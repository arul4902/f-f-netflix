export type MediaType = 'image' | 'video' | 'interactive';

export interface StoryBeat {
  title?: string;
  text: string;
  quote?: string;
  quoteAuthor?: string;
  highlight?: boolean;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  date: string;
  year: string;
  duration: string;
  matchScore: string; // e.g. "99% Match"
  genre: string;
  synopsis: string;
  storyBeats: StoryBeat[];
  imageSrc?: string;
  videoSrc?: string;
  mediaCaption?: string;
  interactiveType?: 
    | 'instagram-request' 
    | 'dimple-detector' 
    | 'dosa-deal' 
    | 'first-call' 
    | 'distance-map' 
    | 'wedding-countdown' 
    | 'wedding-film' 
    | 'wedding-game' 
    | 'tiny-warrior' 
    | 'husband-support' 
    | 'our-home' 
    | 'still-choosing'
    | 'general';
  quotes?: string[];
  isFeatured?: boolean;
}

export interface MomentCard {
  id: string;
  title: string;
  subtitle?: string;
  synopsis: string;
  category: 'replay' | 'chaos' | 'family';
  tag: string;
  imageSrc?: string;
  videoSrc?: string;
  detailStory: string;
  quote?: string;
  relatedChapterId?: string;
}

export interface TimelineNode {
  id: string;
  date: string;
  year: string;
  title: string;
  description: string;
  chapterId?: string;
  imageSrc?: string;
  videoSrc?: string;
  tag: string;
  mood: 'nostalgic' | 'playful' | 'romantic' | 'uncertain' | 'hopeful' | 'emotional' | 'triumphant';
}

export interface LittleThing {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  synopsis: string;
  quote?: string;
  detailText: string;
  imageSrc?: string;
  interactiveType: 'dimple' | 'dosa' | 'bus' | 'call' | 'apology' | 'bride-game' | '5am-club' | 'chef-flowers';
}
