export type FilterCategory = 'realistic' | 'snap_animals' | 'warps' | 'fantasy';

export type CharacterFilterId =
  | 'none'
  | 'cyberpunk'
  | 'gold_mask'
  | 'tiger'
  | 'pharaoh'
  | 'phantom_skull'
  | 'aviator'
  | 'glamour_tiara'
  | 'oni_samurai'
  | 'doggo'
  | 'kitty'
  | 'butterfly'
  | 'rainbow_vomit'
  | 'neon_horns'
  | 'angel_devil'
  | 'bear'
  | 'anime_blush'
  | 'alien'
  | 'cowboy'
  | 'wizard'
  | 'robot'
  | 'clown'
  | 'thuglife'
  | 'zombie'
  | 'royal'
  | 'octo'
  | 'warp_bignose'
  | 'warp_fisheye'
  | 'warp_swirl'
  | 'warp_squish'
  | 'warp_pixel';

export type VoiceEffectId = 'none' | 'chipmunk' | 'robot' | 'echo' | 'alien';

export interface CharacterFilter {
  id: CharacterFilterId;
  name: string;
  category: FilterCategory;
  emoji: string;
  description: string;
  accentColor: string;
  recommendedVoice?: VoiceEffectId;
}

export interface CaptureItem {
  id: string;
  type: 'photo' | 'video' | 'photo-strip';
  url: string; // Data URL or Blob URL
  thumbnailUrl: string;
  createdAt: number;
  filterName: string;
  duration?: number; // In seconds for video
  title?: string;
  photoStripUrls?: string[];
  aiCharacter?: AiCharacterPersona;
}

export interface AiCharacterPersona {
  characterName: string;
  archetype: string;
  power: string;
  weakness: string;
  catchphrase: string;
  backstory: string;
  soundEffect: string;
  suggestedFilter: string;
  ratingBadge: string;
  voiceAudioBase64?: string | null;
}

export interface FaceLandmarks {
  forehead: { x: number; y: number };
  leftEye: { x: number; y: number };
  rightEye: { x: number; y: number };
  noseTip: { x: number; y: number };
  mouthCenter: { x: number; y: number };
  chin: { x: number; y: number };
  leftCheek: { x: number; y: number };
  rightCheek: { x: number; y: number };
  mouthOpen: number; // 0 to 1
  leftEyeClosed: boolean;
  rightEyeClosed: boolean;
  faceWidth: number;
  faceHeight: number;
  rollAngle: number;
  pitchAngle: number;
  yawAngle: number;
}

export interface FaceAnchor {
  x: number; // 0..1 relative to canvas width
  y: number; // 0..1 relative to canvas height
  scale: number; // 0.5 .. 2.0
  rotation: number; // radians
  mouthOpenness?: number; // 0..1
  landmarks?: FaceLandmarks;
}
