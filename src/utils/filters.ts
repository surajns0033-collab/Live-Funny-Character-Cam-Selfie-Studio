// Live Canvas Character AR and Deformation Engine
import { CharacterFilter, CharacterFilterId, FaceAnchor } from '../types';

export const CHARACTER_FILTERS: CharacterFilter[] = [
  {
    id: 'none',
    name: 'Normal Cam',
    category: 'realistic',
    emoji: '✨',
    description: 'Clean high-def mirror camera feed',
    accentColor: '#94a3b8',
    recommendedVoice: 'none',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Cyborg',
    category: 'realistic',
    emoji: '🦾',
    description: 'Titanium skull plate, glowing cyan ocular aperture & HUD telemetry',
    accentColor: '#06b6d4',
    recommendedVoice: 'robot',
  },
  {
    id: 'gold_mask',
    name: 'Venetian Masquerade',
    category: 'realistic',
    emoji: '🎭',
    description: 'Embossed gold filigree mask with ruby pendant & metallic luster',
    accentColor: '#eab308',
    recommendedVoice: 'echo',
  },
  {
    id: 'tiger',
    name: 'Wild Bengal Tiger',
    category: 'realistic',
    emoji: '🐯',
    description: 'Realistic tiger fur contouring, predatory cat pupils, whiskers & roaring fangs',
    accentColor: '#ea580c',
    recommendedVoice: 'robot',
  },
  {
    id: 'pharaoh',
    name: 'Golden Pharaoh',
    category: 'realistic',
    emoji: '👑',
    description: '24K gold nemes headdress, lapis lazuli stripes, cobra Uraeus & kohl eyeliner',
    accentColor: '#fbbf24',
    recommendedVoice: 'echo',
  },
  {
    id: 'phantom_skull',
    name: 'Phantom Skull',
    category: 'realistic',
    emoji: '💀',
    description: 'Realistic cranium bone anatomy with ethereal spectral blue flame eyes',
    accentColor: '#38bdf8',
    recommendedVoice: 'robot',
  },
  {
    id: 'aviator',
    name: 'Top Gun Aviator',
    category: 'realistic',
    emoji: '🕶️',
    description: 'Mirrored chrome aviator sunglasses with dynamic sky reflection & gold frame',
    accentColor: '#f59e0b',
    recommendedVoice: 'none',
  },
  {
    id: 'glamour_tiara',
    name: 'Diamond Tiara',
    category: 'realistic',
    emoji: '💎',
    description: 'Faceted sparkling diamond tiara, cheekbone highlighter & winged eyeliner',
    accentColor: '#ec4899',
    recommendedVoice: 'echo',
  },
  {
    id: 'oni_samurai',
    name: 'Neon Oni Samurai',
    category: 'realistic',
    emoji: '👹',
    description: 'Japanese demon mask, sharp horn spires, golden fangs & war paint',
    accentColor: '#dc2626',
    recommendedVoice: 'robot',
  },
  {
    id: 'doggo',
    name: 'Goofy Pup',
    category: 'snap_animals',
    emoji: '🐶',
    description: 'Bouncing floppy puppy ears, snout & reactive panting tongue',
    accentColor: '#f59e0b',
    recommendedVoice: 'chipmunk',
  },
  {
    id: 'kitty',
    name: 'Cyber Kitty',
    category: 'snap_animals',
    emoji: '🐱',
    description: 'Neon glowing ears, twitchy whiskers & anime stars',
    accentColor: '#ec4899',
    recommendedVoice: 'chipmunk',
  },
  {
    id: 'butterfly',
    name: 'Gold Butterflies',
    category: 'snap_animals',
    emoji: '🦋',
    description: '3D fluttering golden butterflies orbiting head with fairy dust',
    accentColor: '#f59e0b',
    recommendedVoice: 'echo',
  },
  {
    id: 'bear',
    name: 'Cute Teddy',
    category: 'snap_animals',
    emoji: '🧸',
    description: 'Fluffy round bear ears, button nose & warm blush',
    accentColor: '#b45309',
    recommendedVoice: 'chipmunk',
  },
  {
    id: 'anime_blush',
    name: 'Anime Chibi',
    category: 'snap_animals',
    emoji: '🌸',
    description: 'Cute anime cheek lines, heart stamp & sparkles',
    accentColor: '#f43f5e',
    recommendedVoice: 'chipmunk',
  },
  {
    id: 'rainbow_vomit',
    name: 'Rainbow Stream',
    category: 'fantasy',
    emoji: '🌈',
    description: 'Iconic streaming rainbow cascade from mouth with starry eyes',
    accentColor: '#38bdf8',
    recommendedVoice: 'chipmunk',
  },
  {
    id: 'neon_horns',
    name: 'Neon Devil Horns',
    category: 'fantasy',
    emoji: '😈',
    description: 'Vibrant glowing magenta horns & winged eyeliner',
    accentColor: '#ec4899',
    recommendedVoice: 'alien',
  },
  {
    id: 'angel_devil',
    name: 'Angel Halo',
    category: 'fantasy',
    emoji: '😇',
    description: 'Floating neon gold halo & soft celestial sparkles',
    accentColor: '#fbbf24',
    recommendedVoice: 'echo',
  },
  {
    id: 'alien',
    name: 'Area 51 Alien',
    category: 'fantasy',
    emoji: '👽',
    description: 'Alien dome, cosmic shiny eyes & bouncing antenna',
    accentColor: '#10b981',
    recommendedVoice: 'alien',
  },
  {
    id: 'cowboy',
    name: 'Wild Outlaw',
    category: 'fantasy',
    emoji: '🤠',
    description: 'Stetson hat, giant twirling mustache & sepia',
    accentColor: '#d97706',
    recommendedVoice: 'robot',
  },
  {
    id: 'wizard',
    name: 'Grand Sorcerer',
    category: 'fantasy',
    emoji: '🧙',
    description: 'Starry crooked hat & majestic flowing beard',
    accentColor: '#8b5cf6',
    recommendedVoice: 'echo',
  },
  {
    id: 'robot',
    name: 'Pixel Bot 3000',
    category: 'fantasy',
    emoji: '🤖',
    description: 'Steel visor, blinking antenna & retro scanlines',
    accentColor: '#06b6d4',
    recommendedVoice: 'robot',
  },
  {
    id: 'clown',
    name: 'Silly Clown',
    category: 'fantasy',
    emoji: '🤡',
    description: 'Spinning propeller beanie & squeaky red nose',
    accentColor: '#ef4444',
    recommendedVoice: 'chipmunk',
  },
  {
    id: 'thuglife',
    name: 'Pixel Boss',
    category: 'fantasy',
    emoji: '🕶️',
    description: '8-bit sunglasses, heavy gold chain & cigar smoke',
    accentColor: '#eab308',
    recommendedVoice: 'echo',
  },
  {
    id: 'zombie',
    name: 'Goofy Zombie',
    category: 'fantasy',
    emoji: '🧟',
    description: 'Lime skin, giant crazy eye & neck bolts',
    accentColor: '#84cc16',
    recommendedVoice: 'robot',
  },
  {
    id: 'royal',
    name: 'Golden Monarch',
    category: 'fantasy',
    emoji: '👑',
    description: 'Jeweled crown, bling shades & raining coins',
    accentColor: '#facc15',
    recommendedVoice: 'echo',
  },
  {
    id: 'octo',
    name: 'Octo-Alien',
    category: 'fantasy',
    emoji: '🐙',
    description: 'Purple hood with animated wiggling tentacles',
    accentColor: '#a855f7',
    recommendedVoice: 'alien',
  },
  {
    id: 'warp_bignose',
    name: 'Big Snout Warp',
    category: 'warps',
    emoji: '👃',
    description: 'Hilarious center magnification bubble',
    accentColor: '#f97316',
  },
  {
    id: 'warp_fisheye',
    name: 'Fish-Eye Chubby',
    category: 'warps',
    emoji: '🐡',
    description: 'Spherical convex optical warp with big cheeks',
    accentColor: '#38bdf8',
  },
  {
    id: 'warp_swirl',
    name: 'Spiral Vortex',
    category: 'warps',
    emoji: '🌀',
    description: 'Twists face into an animated hypnotizing vortex',
    accentColor: '#c084fc',
  },
  {
    id: 'warp_squish',
    name: 'Alien Squish',
    category: 'warps',
    emoji: '🥞',
    description: 'Vertically squashed wide comical pancake face',
    accentColor: '#fb7185',
  },
  {
    id: 'warp_pixel',
    name: '8-Bit Retro Chunky',
    category: 'warps',
    emoji: '👾',
    description: 'Pixelated arcade chunky retro gaming look',
    accentColor: '#4ade80',
  },
];

// Helper to draw smooth rounded rectangles
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Particle state for animated floaters (confetti, bubbles, coins, stars)
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  shape?: 'rect' | 'circle' | 'star' | 'bubble';
}

export function createParticleSystem(count = 35): Particle[] {
  const colors = ['#f43f5e', '#38bdf8', '#fbbf24', '#34d399', '#a855f7', '#fb7185', '#e879f9'];
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.003,
    vy: 0.002 + Math.random() * 0.004,
    size: 6 + Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * Math.PI * 2,
    vRot: (Math.random() - 0.5) * 0.08,
    shape: Math.random() > 0.5 ? 'rect' : 'circle',
  }));
}

// Main rendering pass called on every frame
export function renderCharacterFilter(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  filterId: CharacterFilterId,
  anchor: FaceAnchor,
  time: number,
  particles: Particle[]
) {
  if (filterId === 'none') return;

  const fx = anchor.x * width;
  const fy = anchor.y * height;
  const size = Math.min(width, height) * 0.45 * anchor.scale;
  const t = time * 0.001; // seconds

  ctx.save();

  // Face Warps
  if (filterId.startsWith('warp_')) {
    applyFaceWarp(ctx, width, height, fx, fy, size, filterId, t);
    ctx.restore();
    return;
  }

  // Draw Specific Characters
  switch (filterId) {
    case 'cyberpunk':
      drawCyberpunkCyborg(ctx, fx, fy, size, t, anchor);
      break;
    case 'gold_mask':
      drawVenetianGoldMask(ctx, fx, fy, size, t, anchor);
      break;
    case 'tiger':
      drawWildBengalTiger(ctx, fx, fy, size, t, anchor);
      break;
    case 'pharaoh':
      drawPharaohMask(ctx, fx, fy, size, t, anchor);
      break;
    case 'phantom_skull':
      drawPhantomSkull(ctx, fx, fy, size, t, anchor);
      break;
    case 'aviator':
      drawAviatorGlasses(ctx, fx, fy, size, t, anchor);
      break;
    case 'glamour_tiara':
      drawGlamourTiara(ctx, fx, fy, size, t, anchor);
      break;
    case 'oni_samurai':
      drawOniSamurai(ctx, fx, fy, size, t, anchor);
      break;
    case 'doggo':
      drawDoggo(ctx, fx, fy, size, t, anchor);
      break;
    case 'butterfly':
      drawButterflies(ctx, fx, fy, size, t, width, height, anchor.rotation);
      break;
    case 'rainbow_vomit':
      drawRainbowVomit(ctx, fx, fy, size, t, width, height, anchor.rotation);
      break;
    case 'neon_horns':
      drawNeonHorns(ctx, fx, fy, size, t, anchor.rotation);
      break;
    case 'bear':
      drawTeddyBear(ctx, fx, fy, size, t, anchor.rotation);
      break;
    case 'angel_devil':
      drawAngelHalo(ctx, fx, fy, size, t, anchor.rotation);
      break;
    case 'anime_blush':
      drawAnimeBlush(ctx, fx, fy, size, t, anchor.rotation);
      break;
    case 'kitty':
      drawKitty(ctx, fx, fy, size, t, anchor.rotation);
      break;
    case 'alien':
      drawAlien(ctx, fx, fy, size, t, width, height, anchor.rotation);
      break;
    case 'cowboy':
      drawCowboy(ctx, fx, fy, size, t, width, height, anchor.rotation);
      break;
    case 'wizard':
      drawWizard(ctx, fx, fy, size, t, anchor.rotation);
      break;
    case 'robot':
      drawRobot(ctx, fx, fy, size, t, width, height, anchor.rotation);
      break;
    case 'clown':
      drawClown(ctx, fx, fy, size, t, width, height, particles, anchor.rotation);
      break;
    case 'thuglife':
      drawThugLife(ctx, fx, fy, size, t, anchor.rotation);
      break;
    case 'zombie':
      drawZombie(ctx, fx, fy, size, t, width, height, anchor.rotation);
      break;
    case 'royal':
      drawRoyal(ctx, fx, fy, size, t, width, height, particles, anchor.rotation);
      break;
    case 'octo':
      drawOcto(ctx, fx, fy, size, t, anchor.rotation);
      break;
  }

  ctx.restore();
}

// ==========================================
// 1. HYPER-REALISTIC CYBERPUNK CYBORG
// Titanium cranial plating, carbon fiber textures, glowing cybernetic eye & HUD
// ==========================================
function drawCyberpunkCyborg(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, anchor: FaceAnchor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(anchor.rotation || 0);

  // Left cheek & temple titanium cyborg plate
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 12;

  // Metal faceplate base
  const metalGrad = ctx.createLinearGradient(-s * 0.7, -s * 0.6, s * 0.1, s * 0.4);
  metalGrad.addColorStop(0, '#1e293b');
  metalGrad.addColorStop(0.3, '#334155');
  metalGrad.addColorStop(0.7, '#475569');
  metalGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = metalGrad;

  ctx.beginPath();
  ctx.moveTo(-s * 0.65, -s * 0.55);
  ctx.lineTo(-s * 0.1, -s * 0.5);
  ctx.lineTo(-s * 0.05, -s * 0.15);
  ctx.lineTo(-s * 0.18, 0);
  ctx.lineTo(-s * 0.15, s * 0.35);
  ctx.lineTo(-s * 0.48, s * 0.42);
  ctx.lineTo(-s * 0.65, s * 0.1);
  ctx.closePath();
  ctx.fill();

  // Polished chrome bevel edge
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Carbon fiber carbon weave micro-lines
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.45)';
  ctx.lineWidth = 1.5;
  for (let i = -10; i < 15; i++) {
    ctx.beginPath();
    ctx.moveTo(-s * 0.65 + i * 14, -s * 0.5);
    ctx.lineTo(-s * 0.15 + i * 14, s * 0.35);
    ctx.stroke();
  }

  // Glowing neon circuit traces
  const pulse = Math.sin(t * 6) * 0.3 + 0.7;
  ctx.strokeStyle = `rgba(6, 182, 212, ${pulse})`;
  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = 10;
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.moveTo(-s * 0.55, -s * 0.4);
  ctx.lineTo(-s * 0.35, -s * 0.4);
  ctx.lineTo(-s * 0.28, -s * 0.25);
  ctx.lineTo(-s * 0.28, s * 0.15);
  ctx.lineTo(-s * 0.4, s * 0.28);
  ctx.stroke();

  ctx.restore();

  // Hyper-Realistic Glowing Cybernetic Eye (Left Eye)
  const eyeX = -s * 0.32;
  const eyeY = -s * 0.12;

  // Mechanical Eyepiece Socket
  ctx.fillStyle = '#090d16';
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, s * 0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Optical Aperture Rings
  ctx.strokeStyle = '#06b6d4';
  ctx.shadowColor = '#22d3ee';
  ctx.shadowBlur = 14;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, s * 0.13, 0, Math.PI * 2);
  ctx.stroke();

  // Inner Rotating Cyber Reticle
  const rotSpin = t * 3;
  ctx.save();
  ctx.translate(eyeX, eyeY);
  ctx.rotate(rotSpin);
  for (let a = 0; a < 4; a++) {
    const ang = (a * Math.PI) / 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(ang) * s * 0.08, Math.sin(ang) * s * 0.08);
    ctx.lineTo(Math.cos(ang) * s * 0.13, Math.sin(ang) * s * 0.13);
    ctx.stroke();
  }
  ctx.restore();

  // Glowing Cyan Pupil Core
  ctx.fillStyle = '#67e8f9';
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, s * 0.055, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(eyeX - 2, eyeY - 2, s * 0.02, 0, Math.PI * 2);
  ctx.fill();

  // Holographic HUD Telemetry Reticle floating near right eye
  const hudX = s * 0.35;
  const hudY = -s * 0.12;
  ctx.save();
  ctx.translate(hudX, hudY);
  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = 8;
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)';
  ctx.lineWidth = 1.5;

  // Bracket corners
  const bSize = s * 0.18;
  ctx.beginPath();
  // Top-left
  ctx.moveTo(-bSize, -bSize + 8);
  ctx.lineTo(-bSize, -bSize);
  ctx.lineTo(-bSize + 8, -bSize);
  // Top-right
  ctx.moveTo(bSize - 8, -bSize);
  ctx.lineTo(bSize, -bSize);
  ctx.lineTo(bSize, -bSize + 8);
  // Bottom-right
  ctx.moveTo(bSize, bSize - 8);
  ctx.lineTo(bSize, bSize);
  ctx.lineTo(bSize - 8, bSize);
  // Bottom-left
  ctx.moveTo(-bSize + 8, bSize);
  ctx.lineTo(-bSize, bSize);
  ctx.lineTo(-bSize, bSize - 8);
  ctx.stroke();

  // Telemetry readout
  ctx.fillStyle = 'rgba(34, 211, 238, 0.85)';
  ctx.font = `bold ${Math.floor(s * 0.07)}px 'JetBrains Mono', monospace`;
  ctx.fillText('TARGET LOCK: 99.8%', -bSize, bSize + 16);
  ctx.fillText(`HR: ${Math.floor(72 + Math.sin(t * 3) * 6)} BPM`, -bSize, bSize + 30);
  ctx.restore();

  ctx.restore();
}

// ==========================================
// 2. VENETIAN GOLDEN MASQUERADE
// Realistic curved gold filigree mask with embossed metallic reflections & gemstones
// ==========================================
function drawVenetianGoldMask(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, anchor: FaceAnchor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(anchor.rotation || 0);

  // Soft metallic drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;

  // Mask main body shape (fits across eyes, cheekbones, and nose bridge)
  const goldGrad = ctx.createLinearGradient(-s * 0.7, -s * 0.3, s * 0.7, s * 0.2);
  goldGrad.addColorStop(0, '#ca8a04');
  goldGrad.addColorStop(0.2, '#fde047');
  goldGrad.addColorStop(0.5, '#eab308');
  goldGrad.addColorStop(0.8, '#fef08a');
  goldGrad.addColorStop(1, '#a16207');
  ctx.fillStyle = goldGrad;

  ctx.beginPath();
  // Center forehead crest
  ctx.moveTo(0, -s * 0.45);
  // Right wing curve
  ctx.quadraticCurveTo(s * 0.35, -s * 0.52, s * 0.72, -s * 0.28);
  ctx.quadraticCurveTo(s * 0.82, -s * 0.05, s * 0.65, s * 0.12);
  ctx.quadraticCurveTo(s * 0.45, s * 0.2, s * 0.25, s * 0.1);
  // Nose bridge saddle
  ctx.quadraticCurveTo(s * 0.08, s * 0.05, 0, s * 0.16);
  // Left wing curve
  ctx.quadraticCurveTo(-s * 0.08, s * 0.05, -s * 0.25, s * 0.1);
  ctx.quadraticCurveTo(-s * 0.45, s * 0.2, -s * 0.65, s * 0.12);
  ctx.quadraticCurveTo(-s * 0.82, -s * 0.05, -s * 0.72, -s * 0.28);
  ctx.quadraticCurveTo(-s * 0.35, -s * 0.52, 0, -s * 0.45);
  ctx.closePath();
  ctx.fill();

  // Embossed gold filigree edge
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // Elegant Almond Eye Cutouts (Left and Right)
  [-s * 0.32, s * 0.32].forEach((eyeX, idx) => {
    const dir = idx === 0 ? -1 : 1;
    ctx.save();
    ctx.translate(eyeX, -s * 0.1);
    ctx.rotate(dir * 0.12);

    // Cutout hole
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.19, s * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // Jeweled gold rim around eye cutout
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.19, s * 0.12, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  });

  // Delicate lace baroque filigree curls on mask surface
  ctx.strokeStyle = 'rgba(113, 63, 18, 0.45)';
  ctx.lineWidth = 2;
  [-s * 0.48, s * 0.48].forEach((fx, idx) => {
    const dir = idx === 0 ? -1 : 1;
    ctx.beginPath();
    ctx.arc(fx, -s * 0.28, s * 0.1, 0, Math.PI * 1.5);
    ctx.arc(fx + dir * s * 0.08, -s * 0.22, s * 0.06, 0, Math.PI);
    ctx.stroke();
  });

  // Center forehead Royal Ruby jewel
  ctx.save();
  ctx.translate(0, -s * 0.38);
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.065, s * 0.09, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Gem glint shine
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-2, -3, s * 0.02, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

// ==========================================
// 3. REALISTIC BENGAL TIGER
// Realistic tiger stripe contours, fur shading, cat pupils, whiskers & nose
// ==========================================
function drawWildBengalTiger(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, anchor: FaceAnchor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(anchor.rotation || 0);

  // Realistic Tiger Ears (Left and Right with tufts of white fur)
  [-s * 0.58, s * 0.58].forEach((earX, idx) => {
    const dir = idx === 0 ? -1 : 1;
    ctx.save();
    ctx.translate(earX, -s * 0.72);
    ctx.rotate(dir * 0.3);

    // Outer ear
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.22, s * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inner ear white fur tuft
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(0, s * 0.04, s * 0.12, s * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Black tip
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(0, -s * 0.18, s * 0.1, 0, Math.PI);
    ctx.fill();

    ctx.restore();
  });

  // Soft Orange / Amber Face Contouring Overlay
  const faceGrad = ctx.createRadialGradient(0, 0, s * 0.2, 0, 0, s * 0.85);
  faceGrad.addColorStop(0, 'rgba(234, 88, 12, 0.25)');
  faceGrad.addColorStop(0.7, 'rgba(234, 88, 12, 0.4)');
  faceGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');
  ctx.fillStyle = faceGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.8, s * 0.9, 0, 0, Math.PI * 2);
  ctx.fill();

  // White muzzle under-cheek fur highlights
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.beginPath();
  ctx.ellipse(-s * 0.25, s * 0.18, s * 0.22, s * 0.16, -0.2, 0, Math.PI * 2);
  ctx.ellipse(s * 0.25, s * 0.18, s * 0.22, s * 0.16, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Realistic Bengal Tiger Stripes (Forehead and Cheeks)
  ctx.fillStyle = '#18181b';

  // Center Forehead Stripes
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.65);
  ctx.lineTo(-s * 0.04, -s * 0.42);
  ctx.lineTo(s * 0.04, -s * 0.42);
  ctx.closePath();
  ctx.fill();

  // Left & Right Forehead Arches
  [-1, 1].forEach((dir) => {
    ctx.beginPath();
    ctx.moveTo(dir * s * 0.08, -s * 0.6);
    ctx.quadraticCurveTo(dir * s * 0.18, -s * 0.52, dir * s * 0.28, -s * 0.62);
    ctx.lineTo(dir * s * 0.22, -s * 0.52);
    ctx.closePath();
    ctx.fill();

    // Cheek Stripes (3 curved tapering claw stripes)
    [s * 0.02, s * 0.12, s * 0.22].forEach((sy) => {
      ctx.beginPath();
      ctx.moveTo(dir * s * 0.65, sy);
      ctx.quadraticCurveTo(dir * s * 0.48, sy + s * 0.02, dir * s * 0.35, sy - s * 0.04);
      ctx.lineTo(dir * s * 0.48, sy + s * 0.05);
      ctx.closePath();
      ctx.fill();
    });
  });

  // Tiger Nose (Soft Pink carnivore nose pad)
  ctx.fillStyle = '#f472b6';
  ctx.beginPath();
  ctx.moveTo(0, s * 0.08);
  ctx.lineTo(-s * 0.11, s * 0.02);
  ctx.lineTo(s * 0.11, s * 0.02);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#18181b';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Philtrum & Whisker Dots
  ctx.strokeStyle = '#18181b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.08);
  ctx.lineTo(0, s * 0.15);
  ctx.stroke();

  // Whiskers (Left & Right graceful curves)
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  [-1, 1].forEach((dir) => {
    [-s * 0.02, s * 0.04, s * 0.1].forEach((wy, idx) => {
      ctx.beginPath();
      ctx.moveTo(dir * s * 0.14, s * 0.12 + wy);
      ctx.quadraticCurveTo(dir * s * 0.45, s * 0.12 + wy + idx * 4, dir * s * 0.85, s * 0.18 + wy * 1.8);
      ctx.stroke();
    });
  });

  // ROARING TIGER FANGS & OPEN MOUTH when mouth opened
  if ((anchor.mouthOpenness || 0) > 0.2) {
    const mOpen = Math.min(1.0, (anchor.mouthOpenness || 0) * 1.6);
    ctx.save();
    ctx.translate(0, s * 0.26);
    // Dark carnivore oral cavity
    ctx.fillStyle = '#450a0a';
    ctx.beginPath();
    ctx.ellipse(0, s * 0.08 * mOpen, s * 0.24, s * 0.16 * mOpen, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Red tongue
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.ellipse(0, s * 0.12 * mOpen, s * 0.14, s * 0.08 * mOpen, 0, 0, Math.PI * 2);
    ctx.fill();

    // Upper sharp sabre fangs
    ctx.fillStyle = '#fefce8';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1.5;
    [-s * 0.16, s * 0.16].forEach(fx => {
      ctx.beginPath();
      ctx.moveTo(fx - s * 0.03, 0);
      ctx.lineTo(fx, s * 0.14 * mOpen);
      ctx.lineTo(fx + s * 0.03, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });

    // Lower fangs
    [-s * 0.12, s * 0.12].forEach(fx => {
      ctx.beginPath();
      ctx.moveTo(fx - s * 0.025, s * 0.2 * mOpen);
      ctx.lineTo(fx, s * 0.08 * mOpen);
      ctx.lineTo(fx + s * 0.025, s * 0.2 * mOpen);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();
  }

  ctx.restore();
}

// ==========================================
// 4. GOLDEN PHARAOH TUTANKHAMUN
// 24K gold nemes headdress, lapis lazuli stripes, cobra Uraeus & kohl eyeliner
// ==========================================
function drawPharaohMask(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, anchor: FaceAnchor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(anchor.rotation || 0);

  // Nemes Headcloth Flaps (Left & Right regal blue and gold stripes)
  [-1, 1].forEach((dir) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(dir * s * 0.35, -s * 0.35);
    ctx.lineTo(dir * s * 0.78, s * 0.2);
    ctx.lineTo(dir * s * 0.65, s * 0.7);
    ctx.lineTo(dir * s * 0.32, s * 0.55);
    ctx.lineTo(dir * s * 0.25, s * 0.15);
    ctx.closePath();

    // Striped 24K Gold and Lapis Lazuli gradient
    const stripeGrad = ctx.createLinearGradient(0, -s * 0.3, 0, s * 0.7);
    stripeGrad.addColorStop(0, '#eab308');
    stripeGrad.addColorStop(0.12, '#1e3a8a');
    stripeGrad.addColorStop(0.24, '#facc15');
    stripeGrad.addColorStop(0.36, '#172554');
    stripeGrad.addColorStop(0.48, '#fbbf24');
    stripeGrad.addColorStop(0.6, '#1e3a8a');
    stripeGrad.addColorStop(0.72, '#fde047');
    stripeGrad.addColorStop(0.84, '#172554');
    stripeGrad.addColorStop(1, '#eab308');
    ctx.fillStyle = stripeGrad;
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  });

  // Nemes Forehead Crown Dome
  const crownGrad = ctx.createLinearGradient(-s * 0.5, -s * 0.8, s * 0.5, -s * 0.3);
  crownGrad.addColorStop(0, '#ca8a04');
  crownGrad.addColorStop(0.25, '#1e3a8a');
  crownGrad.addColorStop(0.5, '#fde047');
  crownGrad.addColorStop(0.75, '#172554');
  crownGrad.addColorStop(1, '#ca8a04');
  ctx.fillStyle = crownGrad;
  ctx.beginPath();
  ctx.arc(0, -s * 0.45, s * 0.48, Math.PI, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Solid Gold Forehead Band
  const bandGrad = ctx.createLinearGradient(-s * 0.45, 0, s * 0.45, 0);
  bandGrad.addColorStop(0, '#ca8a04');
  bandGrad.addColorStop(0.5, '#fef08a');
  bandGrad.addColorStop(1, '#ca8a04');
  ctx.fillStyle = bandGrad;
  ctx.fillRect(-s * 0.45, -s * 0.48, s * 0.9, s * 0.12);
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 2;
  ctx.strokeRect(-s * 0.45, -s * 0.48, s * 0.9, s * 0.12);

  // Sacred Cobra Uraeus (Center Forehead)
  ctx.save();
  ctx.translate(0, -s * 0.52);
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.ellipse(0, -s * 0.08, s * 0.08, s * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Cobra Coiled body
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-s * 0.04, -s * 0.08, 0, -s * 0.15);
  ctx.quadraticCurveTo(s * 0.03, -s * 0.2, 0, -s * 0.24);
  ctx.stroke();
  // Glowing Ruby Cobra Eyes
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(-s * 0.02, -s * 0.24, 2.5, 0, Math.PI * 2);
  ctx.arc(s * 0.02, -s * 0.24, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Dramatic Cleopatra / Pharaoh Kohl Winged Eyeliner (Left & Right)
  [-s * 0.32, s * 0.32].forEach((eyeX, idx) => {
    const dir = idx === 0 ? -1 : 1;
    ctx.save();
    ctx.translate(eyeX, -s * 0.1);
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-dir * s * 0.14, 0);
    ctx.quadraticCurveTo(0, -s * 0.06, dir * s * 0.14, 0);
    ctx.quadraticCurveTo(dir * s * 0.22, -s * 0.02, dir * s * 0.3, -s * 0.08);
    ctx.stroke();
    // Lower Kohl Line
    ctx.beginPath();
    ctx.moveTo(-dir * s * 0.12, s * 0.02);
    ctx.quadraticCurveTo(0, s * 0.06, dir * s * 0.14, s * 0.02);
    ctx.lineTo(dir * s * 0.24, s * 0.01);
    ctx.stroke();
    // Gold shimmer above eye
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-dir * s * 0.12, -s * 0.08);
    ctx.quadraticCurveTo(0, -s * 0.12, dir * s * 0.22, -s * 0.1);
    ctx.stroke();
    ctx.restore();
  });

  // Royal Golden Braided Pharaoh Goatee Beard (Extending from Chin)
  ctx.save();
  ctx.translate(0, s * 0.44);
  const beardGrad = ctx.createLinearGradient(0, 0, 0, s * 0.45);
  beardGrad.addColorStop(0, '#ca8a04');
  beardGrad.addColorStop(0.3, '#fef08a');
  beardGrad.addColorStop(0.7, '#eab308');
  beardGrad.addColorStop(1, '#a16207');
  ctx.fillStyle = beardGrad;
  ctx.beginPath();
  ctx.moveTo(-s * 0.06, 0);
  ctx.lineTo(-s * 0.04, s * 0.38);
  ctx.quadraticCurveTo(0, s * 0.44, s * 0.04, s * 0.38);
  ctx.lineTo(s * 0.06, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 2;
  ctx.stroke();
  // Braided chevron texture
  ctx.strokeStyle = '#1e3a8a';
  ctx.lineWidth = 2;
  for (let b = s * 0.06; b < s * 0.36; b += s * 0.06) {
    ctx.beginPath();
    ctx.moveTo(-s * 0.05, b);
    ctx.lineTo(0, b + s * 0.025);
    ctx.lineTo(s * 0.05, b);
    ctx.stroke();
  }
  ctx.restore();

  ctx.restore();
}

// ==========================================
// 5. REALISTIC PHANTOM SKULL
// Anatomical bone structure with ethereal spectral blue flame eyes
// ==========================================
function drawPhantomSkull(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, anchor: FaceAnchor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(anchor.rotation || 0);

  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 20;

  // Realistic bone shading
  const boneGrad = ctx.createRadialGradient(0, -s * 0.2, s * 0.1, 0, 0, s * 0.7);
  boneGrad.addColorStop(0, '#f8fafc');
  boneGrad.addColorStop(0.5, '#e2e8f0');
  boneGrad.addColorStop(0.85, '#cbd5e1');
  boneGrad.addColorStop(1, '#64748b');
  ctx.fillStyle = boneGrad;

  // Upper Cranium & Brow outline
  ctx.beginPath();
  ctx.arc(0, -s * 0.28, s * 0.48, Math.PI * 0.85, Math.PI * 2.15);
  ctx.quadraticCurveTo(s * 0.52, s * 0.1, s * 0.38, s * 0.22);
  ctx.lineTo(s * 0.22, s * 0.34);
  ctx.lineTo(-s * 0.22, s * 0.34);
  ctx.lineTo(-s * 0.38, s * 0.22);
  ctx.quadraticCurveTo(-s * 0.52, s * 0.1, -s * 0.44, -s * 0.15);
  ctx.closePath();
  ctx.fill();

  // Bone fissures & cracks
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(s * 0.05, -s * 0.65);
  ctx.lineTo(s * 0.08, -s * 0.52);
  ctx.lineTo(s * 0.02, -s * 0.42);
  ctx.lineTo(s * 0.09, -s * 0.32);
  ctx.stroke();

  ctx.restore();

  // Dark Hollow Eye Orbits with Spectral Cyan Flame Embers
  [-s * 0.22, s * 0.22].forEach((eyeX, idx) => {
    const dir = idx === 0 ? -1 : 1;
    ctx.save();
    ctx.translate(eyeX, -s * 0.08);

    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.16, s * 0.18, dir * 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Spectral Cyan Phantom Flame Embers in Eye Sockets
    const flicker = Math.sin(t * 8 + idx * 3) * 0.2 + 0.8;
    const flameGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, s * 0.14 * flicker);
    flameGrad.addColorStop(0, '#ffffff');
    flameGrad.addColorStop(0.3, '#38bdf8');
    flameGrad.addColorStop(0.7, '#0284c7');
    flameGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');

    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 18;
    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.13 * flicker, 0, Math.PI * 2);
    ctx.fill();

    // Floating flame tongue
    ctx.fillStyle = '#e0f2fe';
    ctx.beginPath();
    ctx.ellipse(0, -Math.sin(t * 12 + idx) * 4, s * 0.04, s * 0.07, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });

  // Pear-shaped Nasal Cavity
  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.moveTo(0, s * 0.04);
  ctx.lineTo(-s * 0.06, s * 0.18);
  ctx.quadraticCurveTo(0, s * 0.22, s * 0.06, s * 0.18);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Upper Dental Row (Teeth)
  ctx.save();
  ctx.translate(0, s * 0.28);
  const toothW = s * 0.045;
  const toothH = s * 0.09;
  for (let i = -3; i <= 3; i++) {
    const tx = i * toothW;
    const tGrad = ctx.createLinearGradient(0, 0, 0, toothH);
    tGrad.addColorStop(0, '#f8fafc');
    tGrad.addColorStop(0.8, '#e2e8f0');
    tGrad.addColorStop(1, '#94a3b8');
    ctx.fillStyle = tGrad;
    ctx.beginPath();
    ctx.roundRect(tx - toothW * 0.45, 0, toothW * 0.9, toothH, 3);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.restore();

  ctx.restore();
}

// ==========================================
// 6. TOP GUN AVIATOR SUNGLASSES
// Mirrored chrome teardrop lenses with sky & cloud panorama reflections
// ==========================================
function drawAviatorGlasses(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, anchor: FaceAnchor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(anchor.rotation || 0);

  // Gold Double Bridge Bar
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 4;
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.moveTo(-s * 0.42, -s * 0.26);
  ctx.lineTo(s * 0.42, -s * 0.26);
  ctx.stroke();
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(-s * 0.12, -s * 0.16);
  ctx.quadraticCurveTo(0, -s * 0.22, s * 0.12, -s * 0.16);
  ctx.stroke();

  // Left and Right Teardrop Aviator Lenses with Sky Horizon Reflection
  [-s * 0.28, s * 0.28].forEach((lx, idx) => {
    ctx.save();
    ctx.translate(lx, -s * 0.12);

    ctx.beginPath();
    ctx.moveTo(-s * 0.24, -s * 0.14);
    ctx.lineTo(s * 0.24, -s * 0.14);
    ctx.quadraticCurveTo(s * 0.28, s * 0.12, s * 0.08, s * 0.26);
    ctx.quadraticCurveTo(0, s * 0.28, -s * 0.08, s * 0.26);
    ctx.quadraticCurveTo(-s * 0.28, s * 0.12, -s * 0.24, -s * 0.14);
    ctx.closePath();

    // Panoramic Sky & Horizon Gradient shifting with tilt
    const rollOffset = (anchor.rotation || 0) * s * 0.3;
    const skyGrad = ctx.createLinearGradient(0, -s * 0.18 + rollOffset, 0, s * 0.28 + rollOffset);
    skyGrad.addColorStop(0, '#0284c7');
    skyGrad.addColorStop(0.4, '#38bdf8');
    skyGrad.addColorStop(0.65, '#fde047');
    skyGrad.addColorStop(0.85, '#ea580c');
    skyGrad.addColorStop(1, '#7c2d12');
    ctx.fillStyle = skyGrad;
    ctx.fill();

    // Passing cloud reflection
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.ellipse(Math.sin(t * 0.5 + idx) * 10, -s * 0.04, s * 0.14, s * 0.05, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Specular Glass Glare
    const glareX = Math.sin(t * 1.5) * s * 0.06;
    const glareGrad = ctx.createLinearGradient(-s * 0.2 + glareX, -s * 0.16, s * 0.15 + glareX, s * 0.25);
    glareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
    glareGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.25)');
    glareGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
    glareGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0)');
    glareGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.35)');
    glareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glareGrad;
    ctx.fill();

    // 18K Gold Wire Rim
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    ctx.restore();
  });

  ctx.restore();
}

// ==========================================
// 7. GLAMOUR DIAMOND TIARA & BEAUTY STROBING
// Faceted crystalline tiara, cheekbone strobing highlighter & winged eyeliner
// ==========================================
function drawGlamourTiara(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, anchor: FaceAnchor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(anchor.rotation || 0);

  // Soft luminous cheekbone & nose highlighter
  const glowGrad = ctx.createRadialGradient(0, s * 0.1, s * 0.05, 0, s * 0.1, s * 0.65);
  glowGrad.addColorStop(0, 'rgba(254, 240, 138, 0.22)');
  glowGrad.addColorStop(0.5, 'rgba(244, 114, 182, 0.15)');
  glowGrad.addColorStop(1, 'rgba(244, 114, 182, 0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.ellipse(0, s * 0.1, s * 0.7, s * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cheekbone Luminous Strobing Highlighters
  [-s * 0.42, s * 0.42].forEach(cx => {
    const cheekGrad = ctx.createRadialGradient(cx, s * 0.12, 2, cx, s * 0.12, s * 0.22);
    cheekGrad.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
    cheekGrad.addColorStop(0.4, 'rgba(251, 207, 232, 0.3)');
    cheekGrad.addColorStop(1, 'rgba(251, 207, 232, 0)');
    ctx.fillStyle = cheekGrad;
    ctx.beginPath();
    ctx.arc(cx, s * 0.12, s * 0.22, 0, Math.PI * 2);
    ctx.fill();
  });

  // Nose tip sparkle
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.beginPath();
  ctx.arc(0, s * 0.14, 3, 0, Math.PI * 2);
  ctx.fill();

  // Cat Eyeliner (Left & Right)
  [-s * 0.3, s * 0.3].forEach((ex, idx) => {
    const dir = idx === 0 ? -1 : 1;
    ctx.strokeStyle = '#09090b';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(ex - dir * s * 0.12, -s * 0.1);
    ctx.quadraticCurveTo(ex, -s * 0.15, ex + dir * s * 0.14, -s * 0.1);
    ctx.quadraticCurveTo(ex + dir * s * 0.2, -s * 0.13, ex + dir * s * 0.26, -s * 0.18);
    ctx.stroke();
  });

  // Diamond Platinum Tiara Arch atop forehead
  ctx.save();
  ctx.translate(0, -s * 0.48);

  // Platinum Base Arch
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 4;
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(0, s * 0.2, s * 0.52, Math.PI * 1.25, Math.PI * 1.75);
  ctx.stroke();

  // Five Diamond Spires / Points
  const spires = [
    { x: 0, h: s * 0.28, r: 8 },
    { x: -s * 0.18, h: s * 0.22, r: 6.5 },
    { x: s * 0.18, h: s * 0.22, r: 6.5 },
    { x: -s * 0.34, h: s * 0.15, r: 5 },
    { x: s * 0.34, h: s * 0.15, r: 5 },
  ];

  spires.forEach((sp, idx) => {
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(sp.x, 0);
    ctx.lineTo(sp.x, -sp.h);
    ctx.stroke();

    ctx.save();
    ctx.translate(sp.x, -sp.h);

    // Multi-faceted Diamond
    const dGrad = ctx.createRadialGradient(-2, -2, 1, 0, 0, sp.r);
    dGrad.addColorStop(0, '#ffffff');
    dGrad.addColorStop(0.5, '#e0f2fe');
    dGrad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = dGrad;
    ctx.beginPath();
    ctx.moveTo(0, -sp.r * 1.2);
    ctx.lineTo(sp.r, -sp.r * 0.3);
    ctx.lineTo(0, sp.r * 1.2);
    ctx.lineTo(-sp.r, -sp.r * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Prismatic Light Flare
    const flarePulse = Math.sin(t * 6 + idx * 2) * 0.4 + 0.6;
    ctx.strokeStyle = `rgba(255, 255, 255, ${flarePulse})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-sp.r * 2.2 * flarePulse, 0);
    ctx.lineTo(sp.r * 2.2 * flarePulse, 0);
    ctx.moveTo(0, -sp.r * 2.2 * flarePulse);
    ctx.lineTo(0, sp.r * 2.2 * flarePulse);
    ctx.stroke();

    ctx.restore();
  });

  ctx.restore();
  ctx.restore();
}

// ==========================================
// 8. NEON ONI SAMURAI DEMON
// Japanese demon mask with crimson horn spires, golden fangs & warpaint
// ==========================================
function drawOniSamurai(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, anchor: FaceAnchor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(anchor.rotation || 0);

  // Curved Crimson Demon Horns
  [-s * 0.42, s * 0.42].forEach((hx, idx) => {
    const dir = idx === 0 ? -1 : 1;
    ctx.save();
    ctx.translate(hx, -s * 0.48);

    const hornGrad = ctx.createLinearGradient(0, 0, dir * s * 0.25, -s * 0.45);
    hornGrad.addColorStop(0, '#991b1b');
    hornGrad.addColorStop(0.5, '#dc2626');
    hornGrad.addColorStop(0.9, '#f87171');
    hornGrad.addColorStop(1, '#ffffff');
    ctx.fillStyle = hornGrad;

    ctx.beginPath();
    ctx.moveTo(-dir * s * 0.08, 0);
    ctx.quadraticCurveTo(dir * s * 0.02, -s * 0.28, dir * s * 0.28, -s * 0.48);
    ctx.quadraticCurveTo(dir * s * 0.12, -s * 0.2, dir * s * 0.08, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#450a0a';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
  });

  // Dark Lacquered Samurai Brow & Nose Bridge
  ctx.fillStyle = '#18181b';
  ctx.beginPath();
  ctx.moveTo(-s * 0.5, -s * 0.35);
  ctx.lineTo(s * 0.5, -s * 0.35);
  ctx.lineTo(s * 0.4, -s * 0.18);
  ctx.lineTo(s * 0.1, -s * 0.18);
  ctx.lineTo(0, s * 0.08);
  ctx.lineTo(-s * 0.1, -s * 0.18);
  ctx.lineTo(-s * 0.4, -s * 0.18);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Menacing Gold Demon Eyes
  [-s * 0.25, s * 0.25].forEach((ex, idx) => {
    const dir = idx === 0 ? -1 : 1;
    ctx.save();
    ctx.translate(ex, -s * 0.14);
    ctx.rotate(dir * 0.15);

    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.12, s * 0.07, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.ellipse(0, 0, 3, s * 0.065, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });

  // Gold Oni Fangs from Lower Jaw
  ctx.save();
  ctx.translate(0, s * 0.3);
  const mOpen = anchor.mouthOpenness || 0;
  [-s * 0.18, s * 0.18].forEach(fx => {
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.moveTo(fx - s * 0.04, s * 0.08 * mOpen);
    ctx.lineTo(fx, -s * 0.12 - s * 0.06 * mOpen);
    ctx.lineTo(fx + s * 0.04, s * 0.08 * mOpen);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#854d0e';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  ctx.restore();

  ctx.restore();
}

function drawDoggo(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, anchor: FaceAnchor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(anchor.rotation || 0);

  const earBounce = Math.sin(t * 6) * (s * 0.05);

  // Left Ear
  ctx.save();
  ctx.translate(-s * 0.65, -s * 0.45);
  ctx.rotate(-0.35 + Math.sin(t * 5) * 0.08);
  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  ctx.ellipse(0, earBounce, s * 0.22, s * 0.55, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.ellipse(-s * 0.02, earBounce + s * 0.05, s * 0.14, s * 0.4, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Right Ear
  ctx.save();
  ctx.translate(s * 0.65, -s * 0.45);
  ctx.rotate(0.35 - Math.sin(t * 5) * 0.08);
  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  ctx.ellipse(0, earBounce, s * 0.22, s * 0.55, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.ellipse(s * 0.02, earBounce + s * 0.05, s * 0.14, s * 0.4, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Snout background
  ctx.fillStyle = '#fde68a';
  ctx.beginPath();
  ctx.ellipse(0, s * 0.12, s * 0.35, s * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Dog Nose (Shiny black rounded triangle)
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.ellipse(0, s * 0.05, s * 0.14, s * 0.09, 0, 0, Math.PI * 2);
  ctx.fill();
  // Nose shine
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath();
  ctx.ellipse(-s * 0.04, s * 0.03, s * 0.04, s * 0.025, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Snout line & dots
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.14);
  ctx.lineTo(0, s * 0.22);
  ctx.stroke();

  ctx.fillStyle = '#78350f';
  [-0.15, -0.09, 0.09, 0.15].forEach(dx => {
    ctx.beginPath();
    ctx.arc(dx * s, s * 0.16, 2.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Animated Licking Tongue responsive to mouth openness
  const mOpen = anchor.mouthOpenness || 0;
  const mouthMultiplier = mOpen > 0.15 ? 1 + mOpen * 1.6 : 0.75;
  const tongueExtend = (Math.max(0, Math.sin(t * 5)) * (s * 0.35) + s * 0.15) * mouthMultiplier;
  const tongueWag = Math.sin(t * 8) * (s * 0.05);
  ctx.fillStyle = '#fb7185';
  ctx.beginPath();
  ctx.ellipse(tongueWag, s * 0.25 + tongueExtend * 0.5, s * 0.14, tongueExtend * 0.55, tongueWag * 0.03, 0, Math.PI * 2);
  ctx.fill();
  // Tongue centerline
  ctx.strokeStyle = '#e11d48';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(tongueWag, s * 0.23);
  ctx.lineTo(tongueWag * 1.2, s * 0.25 + tongueExtend * 0.85);
  ctx.stroke();

  ctx.restore();
}

// SNAPSHOT FILTER: GOLDEN BUTTERFLIES
function drawButterflies(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, w: number, h: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Sparkling golden face glow
  const grad = ctx.createRadialGradient(0, 0, s * 0.1, 0, 0, s * 0.9);
  grad.addColorStop(0, 'rgba(251, 191, 36, 0.12)');
  grad.addColorStop(1, 'rgba(251, 191, 36, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.9, 0, Math.PI * 2);
  ctx.fill();

  // Floating Golden Butterflies around head
  const butterflySpots = [
    { x: -s * 0.55, y: -s * 0.7, scale: 0.28, phase: 0 },
    { x: s * 0.5, y: -s * 0.65, scale: 0.25, phase: 1.2 },
    { x: -s * 0.2, y: -s * 0.95, scale: 0.32, phase: 2.4 },
    { x: s * 0.25, y: -s * 0.9, scale: 0.22, phase: 3.6 },
    { x: -s * 0.65, y: -s * 0.2, scale: 0.2, phase: 4.8 },
    { x: s * 0.65, y: -s * 0.15, scale: 0.22, phase: 5.5 },
  ];

  butterflySpots.forEach((b) => {
    const flap = Math.sin(t * 12 + b.phase);
    const floatY = Math.sin(t * 3 + b.phase) * (s * 0.06);
    const floatX = Math.cos(t * 2 + b.phase) * (s * 0.04);

    ctx.save();
    ctx.translate(b.x + floatX, b.y + floatY);

    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 12;

    // Wing left
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(-s * b.scale * 0.45 * Math.abs(flap), 0, s * b.scale * 0.6 * Math.abs(flap), s * b.scale * 0.45, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(-s * b.scale * 0.35 * Math.abs(flap), 0, s * b.scale * 0.35 * Math.abs(flap), s * b.scale * 0.25, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Wing right
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(s * b.scale * 0.45 * Math.abs(flap), 0, s * b.scale * 0.6 * Math.abs(flap), s * b.scale * 0.45, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(s * b.scale * 0.35 * Math.abs(flap), 0, s * b.scale * 0.35 * Math.abs(flap), s * b.scale * 0.25, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-2, -s * b.scale * 0.3, 4, s * b.scale * 0.6);
    ctx.restore();
  });

  // Soft sparkle glints on cheeks and forehead
  for (let i = 0; i < 6; i++) {
    const spX = Math.sin(i * 1.5) * (s * 0.45);
    const spY = Math.cos(i * 2.1) * (s * 0.35) - s * 0.1;
    const glint = (Math.sin(t * 6 + i) + 1) * 0.5;
    ctx.fillStyle = `rgba(254, 240, 138, ${glint})`;
    drawStar(ctx, spX, spY, 4, s * 0.05, s * 0.02);
  }

  ctx.restore();
}

// SNAPSHOT FILTER: RAINBOW VOMIT
function drawRainbowVomit(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, w: number, h: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Big sparkling cartoon eyes
  [-s * 0.28, s * 0.28].forEach((eyeX) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.ellipse(eyeX, -s * 0.08, s * 0.16, s * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(eyeX, -s * 0.08, s * 0.11, 0, Math.PI * 2);
    ctx.fill();

    // Anime eye reflections
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(eyeX - s * 0.03, -s * 0.11, s * 0.04, 0, Math.PI * 2);
    ctx.arc(eyeX + s * 0.03, -s * 0.06, s * 0.02, 0, Math.PI * 2);
    ctx.fill();
  });

  // Rosy cheeks
  ctx.fillStyle = 'rgba(244, 63, 94, 0.45)';
  ctx.beginPath();
  ctx.arc(-s * 0.42, s * 0.12, s * 0.14, 0, Math.PI * 2);
  ctx.arc(s * 0.42, s * 0.12, s * 0.14, 0, Math.PI * 2);
  ctx.fill();

  // Rainbow waterfall stream coming from mouth down to bottom
  const mouthY = s * 0.26;
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6'];
  const stripeW = s * 0.11;
  const startX = -(colors.length * stripeW) / 2;

  ctx.save();
  colors.forEach((col, idx) => {
    const rx = startX + idx * stripeW;
    ctx.fillStyle = col;

    ctx.beginPath();
    ctx.moveTo(rx, mouthY);
    // Wavy waterfall animation
    const wave = Math.sin(t * 8 + idx * 0.5) * 8;
    ctx.quadraticCurveTo(rx + wave, mouthY + s * 0.8, rx + wave * 1.5, h);
    ctx.lineTo(rx + stripeW + wave * 1.5, h);
    ctx.quadraticCurveTo(rx + stripeW + wave, mouthY + s * 0.8, rx + stripeW, mouthY);
    ctx.closePath();
    ctx.fill();
  });

  // Sparkles & stars in the rainbow stream
  for (let k = 0; k < 5; k++) {
    const starY = mouthY + ((t * 400 + k * 180) % (h * 0.6));
    const starX = (Math.sin(k * 3 + t * 4) * s * 0.25);
    ctx.fillStyle = '#ffffff';
    drawStar(ctx, starX, starY, 4, s * 0.06, s * 0.02);
  }

  // Cute mouth opening overlay
  ctx.fillStyle = '#450a0a';
  ctx.beginPath();
  ctx.ellipse(0, mouthY, (colors.length * stripeW) / 2 + 6, s * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

// SNAPSHOT FILTER: NEON DEVIL HORNS
function drawNeonHorns(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Glowing magenta horns
  ctx.shadowColor = '#f43f5e';
  ctx.shadowBlur = 24;

  [-1, 1].forEach((dir) => {
    ctx.save();
    ctx.translate(dir * s * 0.42, -s * 0.55);
    ctx.scale(dir, 1);

    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.moveTo(-s * 0.12, 0);
    ctx.quadraticCurveTo(-s * 0.05, -s * 0.45, s * 0.22, -s * 0.65);
    ctx.quadraticCurveTo(s * 0.05, -s * 0.35, s * 0.12, 0);
    ctx.closePath();
    ctx.fill();

    // Hot neon core line
    ctx.strokeStyle = '#fecdd3';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.05);
    ctx.quadraticCurveTo(s * 0.02, -s * 0.35, s * 0.19, -s * 0.6);
    ctx.stroke();

    ctx.restore();
  });

  ctx.shadowBlur = 0;

  // Fierce winged eyeliner
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 4;
  [-s * 0.28, s * 0.28].forEach((eyeX, idx) => {
    const dir = idx === 0 ? -1 : 1;
    ctx.beginPath();
    ctx.moveTo(eyeX - dir * s * 0.12, -s * 0.08);
    ctx.quadraticCurveTo(eyeX, -s * 0.15, eyeX + dir * s * 0.18, -s * 0.14);
    ctx.stroke();
  });

  // Soft purple/red moody tint
  const pulse = Math.sin(t * 4) * 0.05 + 0.15;
  ctx.fillStyle = `rgba(225, 29, 72, ${pulse})`;
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.8, s * 0.95, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// SNAPSHOT FILTER: CUTE TEDDY BEAR
function drawTeddyBear(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  const earWiggle = Math.sin(t * 5) * 0.05;

  // Round Teddy Ears
  [-s * 0.58, s * 0.58].forEach((earX, idx) => {
    const dir = idx === 0 ? -1 : 1;
    ctx.save();
    ctx.translate(earX, -s * 0.65);
    ctx.rotate(dir * earWiggle);

    // Outer fluffy ear
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner pink ear pad
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.16, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });

  // Warm Peach Blush
  ctx.fillStyle = 'rgba(251, 146, 60, 0.4)';
  ctx.beginPath();
  ctx.arc(-s * 0.38, s * 0.15, s * 0.14, 0, Math.PI * 2);
  ctx.arc(s * 0.38, s * 0.15, s * 0.14, 0, Math.PI * 2);
  ctx.fill();

  // Cute Oval Snout
  ctx.fillStyle = '#ffedd5';
  ctx.beginPath();
  ctx.ellipse(0, s * 0.12, s * 0.24, s * 0.17, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Black Teddy Button Nose
  ctx.fillStyle = '#1c1917';
  ctx.beginPath();
  ctx.ellipse(0, s * 0.07, s * 0.09, s * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();

  // White shine on nose
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-s * 0.03, s * 0.05, s * 0.025, 0, Math.PI * 2);
  ctx.fill();

  // Mouth line
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.13);
  ctx.lineTo(0, s * 0.18);
  ctx.moveTo(-s * 0.07, s * 0.22);
  ctx.quadraticCurveTo(0, s * 0.18, s * 0.07, s * 0.22);
  ctx.stroke();

  ctx.restore();
}

// SNAPSHOT FILTER: ANGEL HALO
function drawAngelHalo(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  const bobY = Math.sin(t * 3.5) * (s * 0.06);

  // Floating Golden Halo
  ctx.save();
  ctx.translate(0, -s * 0.85 + bobY);

  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 22;

  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.52, s * 0.18, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.52, s * 0.18, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.restore();

  // Soft glowing angel cheeks
  ctx.fillStyle = 'rgba(254, 205, 211, 0.45)';
  ctx.beginPath();
  ctx.arc(-s * 0.35, s * 0.12, s * 0.12, 0, Math.PI * 2);
  ctx.arc(s * 0.35, s * 0.12, s * 0.12, 0, Math.PI * 2);
  ctx.fill();

  // Golden floating sparkles
  for (let i = 0; i < 4; i++) {
    const ang = t * 2 + (i * Math.PI) / 2;
    const spX = Math.cos(ang) * (s * 0.55);
    const spY = -s * 0.75 + Math.sin(ang) * (s * 0.2);
    ctx.fillStyle = '#fef08a';
    drawStar(ctx, spX, spY, 4, s * 0.06, s * 0.025);
  }

  ctx.restore();
}

// SNAPSHOT FILTER: ANIME CHIBI BLUSH
function drawAnimeBlush(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Classic Anime Hash-mark lines & Pink Oval Blush
  [-s * 0.38, s * 0.38].forEach((cx) => {
    ctx.fillStyle = 'rgba(244, 63, 94, 0.42)';
    ctx.beginPath();
    ctx.ellipse(cx, s * 0.14, s * 0.18, s * 0.11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hash mark diagonal lines
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 2.5;
    [-s * 0.06, 0, s * 0.06].forEach((dx) => {
      ctx.beginPath();
      ctx.moveTo(cx + dx - 4, s * 0.18);
      ctx.lineTo(cx + dx + 4, s * 0.1);
      ctx.stroke();
    });
  });

  // Floating red hearts pulsing near eyes
  const pulse = 1 + Math.sin(t * 6) * 0.15;
  ctx.fillStyle = '#f43f5e';
  [-s * 0.5, s * 0.5].forEach((hx, idx) => {
    ctx.save();
    ctx.translate(hx, -s * 0.05);
    ctx.scale(pulse, pulse);
    ctx.rotate(idx === 0 ? -0.2 : 0.2);

    ctx.beginPath();
    ctx.moveTo(0, s * 0.04);
    ctx.bezierCurveTo(-s * 0.06, -s * 0.02, -s * 0.06, -s * 0.08, 0, -s * 0.04);
    ctx.bezierCurveTo(s * 0.06, -s * 0.08, s * 0.06, -s * 0.02, 0, s * 0.04);
    ctx.fill();
    ctx.restore();
  });

  // Anime sparkle forehead star
  ctx.fillStyle = 'rgba(253, 224, 71, 0.85)';
  drawStar(ctx, 0, -s * 0.5, 4, s * 0.1, s * 0.04);

  ctx.restore();
}
function drawKitty(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Glowing Cat Ears with Neon Rim
  ctx.shadowColor = '#f43f5e';
  ctx.shadowBlur = 18;

  // Left Ear
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.moveTo(-s * 0.6, -s * 0.4);
  ctx.lineTo(-s * 0.4, -s * 1.05 + Math.sin(t * 7) * 4);
  ctx.lineTo(-s * 0.15, -s * 0.5);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#ec4899';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Left Ear Inside
  ctx.fillStyle = '#f472b6';
  ctx.beginPath();
  ctx.moveTo(-s * 0.52, -s * 0.44);
  ctx.lineTo(-s * 0.4, -s * 0.95);
  ctx.lineTo(-s * 0.23, -s * 0.52);
  ctx.closePath();
  ctx.fill();

  // Right Ear
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.moveTo(s * 0.6, -s * 0.4);
  ctx.lineTo(s * 0.4, -s * 1.05 - Math.sin(t * 7) * 4);
  ctx.lineTo(s * 0.15, -s * 0.5);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#ec4899';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Right Ear Inside
  ctx.fillStyle = '#f472b6';
  ctx.beginPath();
  ctx.moveTo(s * 0.52, -s * 0.44);
  ctx.lineTo(s * 0.4, -s * 0.95);
  ctx.lineTo(s * 0.23, -s * 0.52);
  ctx.closePath();
  ctx.fill();

  ctx.shadowBlur = 0; // reset shadow

  // Cute Little Pink Heart Nose
  ctx.fillStyle = '#fb7185';
  ctx.beginPath();
  const ny = s * 0.08;
  ctx.moveTo(0, ny + s * 0.05);
  ctx.lineTo(-s * 0.06, ny);
  ctx.quadraticCurveTo(0, ny - s * 0.04, 0, ny);
  ctx.quadraticCurveTo(0, ny - s * 0.04, s * 0.06, ny);
  ctx.closePath();
  ctx.fill();

  // Whiskers (Animated Twitching)
  ctx.strokeStyle = '#fbcfe8';
  ctx.lineWidth = 3;
  const wTwitch = Math.sin(t * 9) * 4;

  // Left whiskers
  [-0.04, 0.03, 0.1].forEach((offY, i) => {
    ctx.beginPath();
    ctx.moveTo(-s * 0.12, ny + offY * s);
    ctx.lineTo(-s * 0.55, ny + (offY * 1.8) * s + (i === 1 ? wTwitch : -wTwitch));
    ctx.stroke();
  });

  // Right whiskers
  [-0.04, 0.03, 0.1].forEach((offY, i) => {
    ctx.beginPath();
    ctx.moveTo(s * 0.12, ny + offY * s);
    ctx.lineTo(s * 0.55, ny + (offY * 1.8) * s + (i === 1 ? -wTwitch : wTwitch));
    ctx.stroke();
  });

  // Anime Sparkle Eyes Stars above
  const starGlow = 0.7 + Math.sin(t * 5) * 0.3;
  ctx.fillStyle = `rgba(253, 224, 71, ${starGlow})`;
  drawStar(ctx, -s * 0.28, -s * 0.08, 4, s * 0.07, s * 0.035);
  drawStar(ctx, s * 0.28, -s * 0.08, 4, s * 0.07, s * 0.035);

  ctx.restore();
}

// 3. ALIEN
function drawAlien(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, w: number, h: number, rot: number) {
  // Cosmic green aura on canvas edges
  ctx.fillStyle = 'rgba(16, 185, 129, 0.06)';
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Big Green Head Dome
  const domePulse = Math.sin(t * 3) * (s * 0.03);
  ctx.fillStyle = 'rgba(74, 222, 128, 0.85)';
  ctx.beginPath();
  ctx.ellipse(0, -s * 0.45, s * 0.65 + domePulse, s * 0.6 + domePulse, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#15803d';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Antenna on top
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, -s * 1.05);
  const antSway = Math.sin(t * 5) * (s * 0.12);
  ctx.quadraticCurveTo(antSway, -s * 1.25, antSway * 1.4, -s * 1.4);
  ctx.stroke();

  // Bouncing Glowing Orb on antenna
  ctx.shadowColor = '#86efac';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(antSway * 1.4, -s * 1.4, s * 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Giant Almond Eyes (Pitch black with cosmic reflections)
  const eyeAng = 0.28;
  // Left eye
  ctx.save();
  ctx.translate(-s * 0.28, -s * 0.08);
  ctx.rotate(-eyeAng);
  ctx.fillStyle = '#052e16';
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.22, s * 0.13, 0, 0, Math.PI * 2);
  ctx.fill();
  // Purple reflection
  ctx.fillStyle = '#a855f7';
  ctx.beginPath();
  ctx.ellipse(s * 0.04, -s * 0.02, s * 0.09, s * 0.05, 0.2, 0, Math.PI * 2);
  ctx.fill();
  // White glint
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-s * 0.06, -s * 0.03, s * 0.03, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Right eye
  ctx.save();
  ctx.translate(s * 0.28, -s * 0.08);
  ctx.rotate(eyeAng);
  ctx.fillStyle = '#052e16';
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.22, s * 0.13, 0, 0, Math.PI * 2);
  ctx.fill();
  // Purple reflection
  ctx.fillStyle = '#a855f7';
  ctx.beginPath();
  ctx.ellipse(-s * 0.04, -s * 0.02, s * 0.09, s * 0.05, -0.2, 0, Math.PI * 2);
  ctx.fill();
  // White glint
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(s * 0.06, -s * 0.03, s * 0.03, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Little alien mouth
  ctx.strokeStyle = '#14532d';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, s * 0.22, s * 0.06, 0.2, Math.PI - 0.2);
  ctx.stroke();

  ctx.restore();
}

// 4. COWBOY
function drawCowboy(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, w: number, h: number, rot: number) {
  // Warm dusty sepia overlay
  ctx.fillStyle = 'rgba(180, 83, 9, 0.07)';
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Cowboy Hat (Brown Stetson)
  ctx.fillStyle = '#78350f';
  // Wide curved brim
  ctx.beginPath();
  ctx.ellipse(0, -s * 0.65, s * 0.95, s * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#451a03';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Hat crown
  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  ctx.moveTo(-s * 0.5, -s * 0.65);
  ctx.quadraticCurveTo(-s * 0.45, -s * 1.25, -s * 0.2, -s * 1.22);
  ctx.quadraticCurveTo(0, -s * 1.05, s * 0.2, -s * 1.22);
  ctx.quadraticCurveTo(s * 0.45, -s * 1.25, s * 0.5, -s * 0.65);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Gold Belt Band
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(-s * 0.48, -s * 0.72, s * 0.96, s * 0.09);
  // Gold Belt Buckle
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(-s * 0.08, -s * 0.75, s * 0.16, s * 0.15);

  // Giant Twirling Handlebar Mustache
  const musBounce = Math.sin(t * 6) * 3;
  ctx.save();
  ctx.translate(0, s * 0.16 + musBounce);
  ctx.fillStyle = '#451a03';

  // Left handlebar
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-s * 0.2, -s * 0.04, -s * 0.45, s * 0.08, -s * 0.55, -s * 0.08);
  ctx.bezierCurveTo(-s * 0.48, -s * 0.12, -s * 0.25, s * 0.04, 0, -s * 0.03);
  ctx.fill();

  // Right handlebar
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(s * 0.2, -s * 0.04, s * 0.45, s * 0.08, s * 0.55, -s * 0.08);
  ctx.bezierCurveTo(s * 0.48, -s * 0.12, s * 0.25, s * 0.04, 0, -s * 0.03);
  ctx.fill();
  ctx.restore();

  // Gold Sheriff Star on corner
  ctx.save();
  ctx.translate(s * 0.55, s * 0.5);
  ctx.fillStyle = '#fbbf24';
  ctx.shadowColor = '#d97706';
  ctx.shadowBlur = 10;
  drawStar(ctx, 0, 0, 5, s * 0.14, s * 0.06);
  ctx.restore();

  ctx.restore();
}

// 5. WIZARD
function drawWizard(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Crooked Starry Cone Hat
  ctx.fillStyle = '#312e81';
  ctx.beginPath();
  ctx.ellipse(0, -s * 0.6, s * 0.75, s * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#4338ca';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Tall cone tip leaning
  const tipSway = Math.sin(t * 3) * (s * 0.15);
  ctx.fillStyle = '#3730a3';
  ctx.beginPath();
  ctx.moveTo(-s * 0.45, -s * 0.6);
  ctx.quadraticCurveTo(-s * 0.2, -s * 1.1, s * 0.2 + tipSway, -s * 1.5);
  ctx.quadraticCurveTo(s * 0.1, -s * 1.0, s * 0.45, -s * 0.6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Crescent Moon on hat
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(s * 0.05, -s * 0.95, s * 0.1, 0.4, 2.7);
  ctx.arc(s * 0.08, -s * 0.93, s * 0.08, 2.7, 0.4, true);
  ctx.closePath();
  ctx.fill();

  // Majestic White Wizard Beard
  const beardSway = Math.sin(t * 3.5) * (s * 0.05);
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(-s * 0.4, s * 0.12);
  ctx.quadraticCurveTo(-s * 0.5, s * 0.5, beardSway, s * 1.05);
  ctx.quadraticCurveTo(s * 0.5, s * 0.5, s * 0.4, s * 0.12);
  ctx.quadraticCurveTo(s * 0.2, s * 0.25, 0, s * 0.22);
  ctx.quadraticCurveTo(-s * 0.2, s * 0.25, -s * 0.4, s * 0.12);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Magic Sparkle Trail orbiting
  const orbX = Math.cos(t * 4) * (s * 0.65);
  const orbY = Math.sin(t * 4) * (s * 0.3) - s * 0.2;
  ctx.shadowColor = '#c084fc';
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#e879f9';
  drawStar(ctx, orbX, orbY, 4, s * 0.1, s * 0.04);
  ctx.shadowBlur = 0;

  ctx.restore();
}

// 6. ROBOT
function drawRobot(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, w: number, h: number, rot: number) {
  // Scanlines across canvas
  ctx.fillStyle = 'rgba(6, 182, 212, 0.05)';
  for (let i = 0; i < h; i += 6) {
    ctx.fillRect(0, i, w, 2);
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Antenna with blinking LED
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.65);
  ctx.lineTo(0, -s * 1.15);
  ctx.stroke();

  const isBlink = Math.sin(t * 8) > 0;
  ctx.fillStyle = isBlink ? '#ef4444' : '#7f1d1d';
  ctx.shadowColor = isBlink ? '#ef4444' : 'transparent';
  ctx.shadowBlur = isBlink ? 16 : 0;
  ctx.beginPath();
  ctx.arc(0, -s * 1.15, s * 0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Glowing Visor across eyes
  const visorW = s * 0.85;
  const visorH = s * 0.28;
  ctx.fillStyle = '#0f172a';
  roundRect(ctx, -visorW / 2, -s * 0.2, visorW, visorH, 8);
  ctx.fill();
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Cyber glowing LED text in visor
  ctx.shadowColor = '#22d3ee';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#22d3ee';
  ctx.font = `bold ${Math.floor(s * 0.12)}px 'JetBrains Mono', monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const glitch = Math.random() > 0.85 ? '10101' : 'SYS:ON';
  ctx.fillText(glitch, 0, -s * 0.06);
  ctx.shadowBlur = 0;

  // Metal Bolts on cheeks
  ctx.fillStyle = '#94a3b8';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  [-s * 0.5, s * 0.5].forEach(bx => {
    ctx.beginPath();
    ctx.arc(bx, s * 0.15, s * 0.06, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Bolt cross
    ctx.beginPath();
    ctx.moveTo(bx - s * 0.03, s * 0.15);
    ctx.lineTo(bx + s * 0.03, s * 0.15);
    ctx.moveTo(bx, s * 0.15 - s * 0.03);
    ctx.lineTo(bx, s * 0.15 + s * 0.03);
    ctx.stroke();
  });

  ctx.restore();
}

// 7. CLOWN
function drawClown(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  t: number,
  w: number,
  h: number,
  particles: Particle[],
  rot: number
) {
  // Update & Draw Confetti
  particles.forEach(p => {
    p.y += p.vy;
    p.x += p.vx;
    p.rotation += p.vRot;
    if (p.y > 1) {
      p.y = 0;
      p.x = Math.random();
    }
    const px = p.x * w;
    const py = p.y * h;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    if (p.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    }
    ctx.restore();
  });

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Propeller Beanie Hat
  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.ellipse(0, -s * 0.58, s * 0.55, s * 0.35, 0, Math.PI, 0);
  ctx.fill();
  ctx.strokeStyle = '#1d4ed8';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Spinning Propeller
  const propSpin = t * 14;
  ctx.save();
  ctx.translate(0, -s * 0.95);
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, s * 0.1);
  ctx.stroke();

  ctx.rotate(propSpin);
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.32, s * 0.07, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Big Shiny Red Bulb Nose
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 15;
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(0, s * 0.08, s * 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Glossy highlight shine on nose
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.beginPath();
  ctx.ellipse(-s * 0.05, s * 0.04, s * 0.05, s * 0.03, -0.4, 0, Math.PI * 2);
  ctx.fill();

  // Rosy Red Painted Cheeks
  ctx.fillStyle = 'rgba(244, 63, 94, 0.45)';
  ctx.beginPath();
  ctx.arc(-s * 0.35, s * 0.15, s * 0.12, 0, Math.PI * 2);
  ctx.arc(s * 0.35, s * 0.15, s * 0.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// 8. THUG LIFE
function drawThugLife(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // 8-bit Pixel Sunglasses
  const w = s * 0.9;
  const h = s * 0.22;
  ctx.fillStyle = '#09090b';

  // Left frame
  ctx.fillRect(-w * 0.48, -s * 0.12, w * 0.44, h);
  // Right frame
  ctx.fillRect(w * 0.04, -s * 0.12, w * 0.44, h);
  // Bridge
  ctx.fillRect(-w * 0.06, -s * 0.08, w * 0.12, h * 0.4);

  // White pixel glints (8-bit stair-step shine)
  ctx.fillStyle = '#ffffff';
  const pxSize = s * 0.04;
  [
    [-w * 0.42, -s * 0.08],
    [-w * 0.38, -s * 0.04],
    [-w * 0.34, 0],
    [w * 0.1, -s * 0.08],
    [w * 0.14, -s * 0.04],
    [w * 0.18, 0],
  ].forEach(([px, py]) => {
    ctx.fillRect(px, py, pxSize, pxSize);
  });

  // Chunky Gold Dollar Chain around neck
  ctx.save();
  ctx.translate(0, s * 0.65);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, -s * 0.2, s * 0.45, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Big Dollar Sign Medallion
  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(0, s * 0.25, s * 0.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#78350f';
  ctx.font = `bold ${Math.floor(s * 0.2)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('$', 0, s * 0.26);
  ctx.restore();

  // Pixel Cigar in mouth
  const cigX = s * 0.18;
  const cigY = s * 0.25;
  ctx.fillStyle = '#78350f';
  ctx.fillRect(cigX, cigY, s * 0.28, s * 0.06);
  // Ash tip
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cigX + s * 0.26, cigY, s * 0.04, s * 0.06);

  // Animated Smoke Puffs
  for (let i = 0; i < 3; i++) {
    const smokeAge = (t * 2 + i * 0.7) % 2;
    const smX = cigX + s * 0.32 + smokeAge * s * 0.15;
    const smY = cigY - smokeAge * s * 0.25;
    const smR = (s * 0.03) + smokeAge * s * 0.05;
    ctx.fillStyle = `rgba(226, 232, 240, ${Math.max(0, 0.7 - smokeAge * 0.35)})`;
    ctx.beginPath();
    ctx.arc(smX, smY, smR, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// 9. ZOMBIE
function drawZombie(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, w: number, h: number, rot: number) {
  // Sickly green canvas tint
  ctx.fillStyle = 'rgba(132, 204, 22, 0.09)';
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Goofy Giant Bloodshot Eyeball on right side
  ctx.save();
  ctx.translate(s * 0.25, -s * 0.05);
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#15803d';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Red veins
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 5; i++) {
    const a = (i * Math.PI) / 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * s * 0.18, Math.sin(a) * s * 0.18);
    ctx.stroke();
  }

  // Goofy tiny pupil tracking
  const pOffX = Math.sin(t * 3) * s * 0.05;
  const pOffY = Math.cos(t * 3) * s * 0.05;
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(pOffX, pOffY, s * 0.07, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Neck Bolt
  ctx.fillStyle = '#64748b';
  ctx.fillRect(-s * 0.58, s * 0.35, s * 0.16, s * 0.08);
  ctx.fillRect(-s * 0.65, s * 0.31, s * 0.08, s * 0.16);

  // Forehead Stitches
  ctx.strokeStyle = '#022c22';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-s * 0.3, -s * 0.4);
  ctx.lineTo(-s * 0.05, -s * 0.5);
  ctx.stroke();
  for (let i = 0; i < 4; i++) {
    const sx = -s * 0.28 + i * s * 0.07;
    const sy = -s * 0.42 - i * s * 0.025;
    ctx.beginPath();
    ctx.moveTo(sx - 3, sy - 8);
    ctx.lineTo(sx + 3, sy + 8);
    ctx.stroke();
  }

  // Oozing green slime droplet
  const drip = (t * 2) % 1.5;
  ctx.fillStyle = '#84cc16';
  ctx.beginPath();
  ctx.arc(0, s * 0.2 + drip * s * 0.3, s * 0.05, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// 10. ROYAL
function drawRoyal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  t: number,
  w: number,
  h: number,
  particles: Particle[],
  rot: number
) {
  // Raining Gold Coins
  particles.forEach(p => {
    p.y += p.vy * 1.5;
    p.rotation += p.vRot;
    if (p.y > 1) {
      p.y = 0;
      p.x = Math.random();
    }
    const px = p.x * w;
    const py = p.y * h;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(p.rotation);
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 0.7, p.size * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  });

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Jeweled Golden Crown
  ctx.shadowColor = '#eab308';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(-s * 0.5, -s * 0.55);
  ctx.lineTo(-s * 0.55, -s * 0.95);
  ctx.lineTo(-s * 0.25, -s * 0.75);
  ctx.lineTo(0, -s * 1.1); // center peak
  ctx.lineTo(s * 0.25, -s * 0.75);
  ctx.lineTo(s * 0.55, -s * 0.95);
  ctx.lineTo(s * 0.5, -s * 0.55);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Crown Jewels (Ruby, Emerald, Sapphire)
  const jewels = [
    { x: -s * 0.55, y: -s * 0.95, color: '#ef4444' },
    { x: -s * 0.25, y: -s * 0.75, color: '#10b981' },
    { x: 0, y: -s * 1.1, color: '#ef4444' },
    { x: s * 0.25, y: -s * 0.75, color: '#3b82f6' },
    { x: s * 0.55, y: -s * 0.95, color: '#10b981' },
  ];
  jewels.forEach(j => {
    ctx.fillStyle = j.color;
    ctx.beginPath();
    ctx.arc(j.x, j.y, s * 0.055, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(j.x - 2, j.y - 2, s * 0.02, 0, Math.PI * 2);
    ctx.fill();
  });

  // Bling Sunglasses
  ctx.fillStyle = '#eab308';
  roundRect(ctx, -s * 0.45, -s * 0.12, s * 0.9, s * 0.25, 12);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  roundRect(ctx, -s * 0.42, -s * 0.09, s * 0.38, s * 0.19, 8);
  ctx.fill();
  roundRect(ctx, s * 0.04, -s * 0.09, s * 0.38, s * 0.19, 8);
  ctx.fill();

  ctx.restore();
}

// 11. OCTO
function drawOcto(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Purple hood
  ctx.fillStyle = '#7e22ce';
  ctx.beginPath();
  ctx.ellipse(0, -s * 0.4, s * 0.55, s * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();

  // Wiggling Tentacles under chin
  for (let i = -2; i <= 2; i++) {
    const tentX = i * (s * 0.18);
    const tentSway = Math.sin(t * 4 + i) * (s * 0.12);
    ctx.strokeStyle = '#9333ea';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(tentX, s * 0.2);
    ctx.quadraticCurveTo(tentX + tentSway, s * 0.5, tentX + tentSway * 1.5, s * 0.85);
    ctx.stroke();

    // Suction cups
    ctx.fillStyle = '#f3e8ff';
    ctx.beginPath();
    ctx.arc(tentX + tentSway * 0.5, s * 0.4, 4, 0, Math.PI * 2);
    ctx.arc(tentX + tentSway * 1.1, s * 0.65, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// 12. FACE WARPS & DEFORMATIONS
function applyFaceWarp(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  cx: number,
  cy: number,
  radius: number,
  filterId: CharacterFilterId,
  t: number
) {
  // We use canvas slice manipulations and zoom-distortion for ultra-smooth 60fps performance
  const r = Math.max(80, radius * 1.2);

  if (filterId === 'warp_bignose' || filterId === 'warp_fisheye') {
    // Spherical magnifying bubble
    const mag = filterId === 'warp_fisheye' ? 1.55 : 1.75;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    // Scale up from center
    ctx.translate(cx, cy);
    ctx.scale(mag, mag);
    ctx.translate(-cx, -cy);
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.restore();

    // Outer lens rim ring
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  } else if (filterId === 'warp_swirl') {
    // Spiral swirl vortex
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    const steps = 6;
    for (let i = 0; i < steps; i++) {
      const stepR = r * ((steps - i) / steps);
      const angle = Math.sin(t * 3) * 0.15 * (i + 1);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, stepR, 0, Math.PI * 2);
      ctx.clip();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.translate(-cx, -cy);
      ctx.drawImage(ctx.canvas, 0, 0);
      ctx.restore();
    }
    ctx.restore();

    ctx.strokeStyle = 'rgba(192, 132, 252, 0.5)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  } else if (filterId === 'warp_squish') {
    // Pancake squish
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 1.25, r * 0.8, 0, 0, Math.PI * 2);
    ctx.clip();

    ctx.translate(cx, cy);
    ctx.scale(1.4, 0.65);
    ctx.translate(-cx, -cy);
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.restore();
  } else if (filterId === 'warp_pixel') {
    // 8-bit arcade chunky downsampling
    const boxSize = r * 1.8;
    const sx = Math.max(0, cx - boxSize / 2);
    const sy = Math.max(0, cy - boxSize / 2);
    const sw = Math.min(w - sx, boxSize);
    const sh = Math.min(h - sy, boxSize);

    if (sw > 10 && sh > 10) {
      ctx.save();
      ctx.imageSmoothingEnabled = false;
      // Draw small then draw back
      const tinyW = Math.max(8, Math.floor(sw / 16));
      const tinyH = Math.max(8, Math.floor(sh / 16));

      const offCanvas = document.createElement('canvas');
      offCanvas.width = tinyW;
      offCanvas.height = tinyH;
      const offCtx = offCanvas.getContext('2d');
      if (offCtx) {
        offCtx.imageSmoothingEnabled = false;
        offCtx.drawImage(ctx.canvas, sx, sy, sw, sh, 0, 0, tinyW, tinyH);

        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.9, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(offCanvas, 0, 0, tinyW, tinyH, sx, sy, sw, sh);
      }
      ctx.restore();
    }
  }
}

// Utility to draw star
function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number
) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}
