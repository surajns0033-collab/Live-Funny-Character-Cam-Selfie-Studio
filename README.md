# Live AR Funny Character Cam & Selfie Studio 📸✨

A high-performance, real-time Augmented Reality (AR) camera and selfie studio built with **React 19**, **TypeScript**, **HTML5 Canvas**, and **Tailwind CSS**. Features continuous 60 FPS face motion tracking (auto-positioning, dynamic scale fitting, head tilt rotation, and mouth-openness reactivity) with zero manual calibration, accompanied by real-time Web Audio voice modulators, video recording, a retro 3-shot photo strip booth, and an AI character persona generator powered by the **Google Gemini API**.

---

## 🚀 Key Highlights & Capabilities

### 1. ⚡ Real-Time 60 FPS Face Motion Tracking Engine
- **100% Automatic Auto-Fit**: Completely eliminates manual anchor dragging, scale sliders, and coordinate alignment.
- **Continuous Spatial Moment Tracking**: Computes real-time skin chrominance centroids $(cx, cy)$, variance $(\mu_{20}, \mu_{02})$, and covariance $(\mu_{11})$ to extract head tilt/roll angles $(\theta = \frac{1}{2}\operatorname{atan2}(2\mu_{11}, \mu_{20} - \mu_{02}))$.
- **Dynamic Scale Fitting**: Automatically expands filter elements when approaching the camera and contracts them when stepping back.
- **Reactive Mouth Openness**: Tracks lower-face oral cavity separation to dynamically trigger reactive filter states (e.g., roaring tiger fangs, panting puppy tongue, cascading rainbow waterfall).
- **Dual-Tier Hardware Acceleration**: Integrates browser-native `FaceDetector` hardware acceleration and MediaPipe landmark bindings with instant sub-millisecond canvas fallbacks.
- **Zero-Jitter Temporal Smoothing**: Uses an exponential dampening filter to produce cinematic, lag-free motion.

---

### 2. 🎭 Curated AR Character & Filter Roster

| Category | Filters | Key Visual & Interactive Mechanics |
| :--- | :--- | :--- |
| **Realistic AR** | **Wild Bengal Tiger** 🐯 | Contoured fur shading, cat slit pupils, fine whiskers, and roaring sabre fangs when mouth opens |
| | **Golden Pharaoh** 👑 | 24K gold nemes headdress with lapis lazuli stripes, cobra Uraeus with ruby eyes, Cleopatra kohl eyeliner, and braided goatee |
| | **Phantom Skull** 💀 | Anatomical bone structure, weathered fissures, dental arch, and deep orbits with glowing ethereal blue flame embers |
| | **Top Gun Aviator** 🕶️ | Mirrored chrome teardrop lenses with dynamic sky/cloud horizon reflections shifting with head tilt, gold wireframe |
| | **Diamond Tiara** 💎 | Faceted sparkling platinum tiara with prismatic light flares, cheekbone strobing highlighter, and winged cat-eyeliner |
| | **Cyberpunk Cyborg** 🦾 | Titanium cranial plating, carbon-fiber sub-mesh, glowing cyan ocular aperture lens, and live holographic HUD telemetry |
| | **Venetian Masquerade** 🎭 | Embossed 3D gold filigree mask with metallic reflections, diamond cutouts, and royal ruby pendant |
| | **Neon Oni Samurai** 👹 | Japanese demon mask with curved crimson horns, gold fangs, and battle warpaint |
| **Snap Animals** | **Goofy Pup** 🐶 | Soft floppy ears bouncing with head momentum, wet puppy nose, and reactive panting tongue on mouth open |
| | **Cyber Kitty** 🐱 | Neon glowing cat ears, twitching whiskers, and anime cheek stars |
| | **Gold Butterflies** 🦋 | 3D golden monarch butterflies orbiting the user's head with fairy dust sparkle trails |
| | **Cute Teddy** 🧸 | Fluffy rounded teddy bear ears, button nose, and warm peach blush |
| | **Anime Chibi** 🌸 | Classic anime blush hash marks, floating hearts, and celestial sparkles |
| **Fantasy & Fun** | **Rainbow Stream** 🌈 | Cascading animated rainbow waterfall surging from the mouth with starry anime eyes |
| | **Neon Devil** 😈 / **Angel Halo** 😇 | Vibrantly glowing magenta horns or floating, pulsing golden halo with celestial dust |
| | **Area 51 Alien** 👽 | Pulsating green cranium dome, almond cosmic eyes, and bouncing antenna orb |
| | **Wild Outlaw** 🤠 / **Grand Sorcerer** 🧙 | Stetson hat with giant twirling mustache or crooked starry wizard hat with flowing beard |
| | **Pixel Bot** 🤖 / **Pixel Boss** 🕶️ | Retro arcade scanlines, 8-bit sunglasses, gold chain, and cigar smoke particles |
| | **Silly Clown** 🤡 / **Goofy Zombie** 🧟 / **Octo-Alien** 🐙 | Spinning propeller beanie with red squeaky nose, lime skin with neck bolts, or wiggling purple tentacles |
| **Optical Warps** | **Warps & Distortions** 🌀 | Big Snout Warp, Fish-Eye Chubby, Spiral Vortex, Alien Squish, and 8-Bit Retro Chunky |

---

### 3. 🎙️ Real-Time Web Audio DSP Voice Modulation
- Built directly on the **Web Audio API** with zero external network audio dependencies:
  - **Chipmunk**: Formant/pitch transposition with high-pass vocal boost.
  - **Cyber Bot**: Ring-modulated robotic frequency carrier with resonant bandpass filter.
  - **Echo Cave**: Multi-tap delay feedback network with low-pass dampening.
  - **Alien Vibrato**: High-depth LFO pitch oscillation.
- **Synthesized SFX Soundboard**: Procedurally synthesizes camera shutter clicks, countdown interval beeps, squeaks, and victory fanfare directly via AudioContext oscillators.

---

### 4. 🎬 Photo Booth, Video Recording & Gallery
- **Instant & Timer Selfies**: Single-click snapshot with optional 3-second or 5-second countdown timer and realistic white screen flash.
- **3-Shot Retro Comic Photo Booth**: Sequenced photo booth session with live countdowns compiling 3 sequential poses into a stylized vertical photo strip with branding and timestamps.
- **Real-Time Video Recording**: Records live video using `MediaRecorder` (`video/webm`), capturing the filtered 60 FPS canvas composited with voice-modulated audio tracks.
- **Integrated Local Media Gallery**:
  - Saved captures persist across sessions using browser storage (`localStorage`).
  - In-app video playback, full-screen lightbox preview, and one-click image/video download.
  - Individual item deletion and safe "Clear All" with confirmation.

---

### 5. 🤖 AI Comic Character Persona Studio
- Powered by `@google/genai` (**Gemini 2.5 Flash**):
  - Sends captured selfies to `/api/ai/transform-character`.
  - Analyzes user facial expression, active filter, and visual features to generate a comedic character persona: superhero/villain alias, ridiculous superpower, funny kryptonite/weakness, catchphrase, backstory, and comic rating badge.
  - Resilient fallback engine: handles free-tier rate limits or quota pauses gracefully without disrupting the user experience.
  - Text-to-Speech character voice generation via Gemini voice endpoints.

---

### 6. 🪞 Fallback Virtual Studio Mirror Cam
- Built-in animated procedural studio model canvas stream:
  - Activates when physical webcams are busy, locked by another application, or permission is restricted.
  - Allows immediate testing of all filters, face tracking auto-fit, voice DSP, and video recording without requiring a physical camera.

---

## 🛠️ Tech Stack & Architecture

```
                       ┌─────────────────────────────────────────┐
                       │          Webcam Stream (gUM)            │
                       │    (or Virtual Studio Mirror Cam)       │
                       └────────────────────┬────────────────────┘
                                            │
                     ┌──────────────────────┴──────────────────────┐
                     ▼                                             ▼
          ┌─────────────────────┐                       ┌─────────────────────┐
          │   Video Processing  │                       │   Web Audio Engine  │
          │   (Canvas 2D / 60fps)│                      │ (Biquad / Delay /   │
          └──────────┬──────────┘                       │  RingMod / LFO)     │
                     │                                  └──────────┬──────────┘
                     ▼                                             │
          ┌─────────────────────┐                                  │
          │ Face Motion Engine  │                                  │
          │ - Centroid / Variance│                                 │
          │ - Head Tilt (Roll)  │                                  │
          │ - Scale Auto-Fit    │                                  │
          │ - Mouth Openness    │                                  │
          └──────────┬──────────┘                                  │
                     │                                             │
                     ▼                                             │
          ┌─────────────────────┐                                  │
          │ Character AR Render │                                  │
          │ (Vector & Composite)│                                  │
          └──────────┬──────────┘                                  │
                     │                                             │
                     ├──────────────────────┬──────────────────────┤
                     ▼                      ▼                      ▼
             ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
             │ Live Display │       │ Photo / Strip│       │ MediaRecorder│
             │   Viewport   │       │   Capture    │       │ (Video+Audio)│
             └──────────────┘       └───────┬──────┘       └──────┬───────┘
                                            │                     │
                                            ▼                     ▼
                                    ┌─────────────────────────────────────┐
                                    │    Local Gallery / Gemini AI Studio │
                                    └─────────────────────────────────────┘
```

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Motion.
- **Backend / API**: Node.js, Express, `tsx`.
- **AI Engine**: `@google/genai` (Google Gen AI SDK), `gemini-2.5-flash`, `gemini-2.5-flash-preview-tts`.
- **Audio & Media**: Web Audio API (native oscillators, gain, biquad filters, delay nodes), `MediaRecorder` API.

---

## 📁 Repository Structure

```
.
├── server.ts                   # Express server mounting Vite middleware & Gemini API routes
├── index.html                  # HTML entry point with typography & meta headers
├── metadata.json               # Application descriptor & required frame permissions
├── package.json                # Dependencies and run scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite + React + Tailwind v4 plugin setup
└── src/
    ├── main.tsx                # React application entry point
    ├── App.tsx                 # Main layout, capture orchestrator, photo booth sequencer
    ├── index.css               # Global Tailwind CSS styles and animation keyframes
    ├── types.ts                # TypeScript domain models (filters, anchors, gallery, personas)
    ├── components/
    │   ├── Header.tsx          # 3-zone responsive top bar with gallery badge & AI launcher
    │   ├── CameraView.tsx      # 60 FPS Canvas AR engine, face motion tracker, camera controls
    │   ├── CaptureControls.tsx # Tactile shutter button, video record toggle, timer, photo booth
    │   ├── FilterPicker.tsx    # Category segmented tabs (Realistic, Snap, Fantasy, Warps)
    │   ├── GalleryModal.tsx    # Media gallery grid, video player, delete & clear-all management
    │   └── AiTransformModal.tsx# AI Comic Persona Studio with card preview and speech player
    └── utils/
        ├── audio.ts            # Web Audio API voice processor DSP and sound effects synthesis
        └── filters.ts          # Comprehensive AR character vector renderer and deformation engine
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**
- Modern web browser (Chrome, Edge, Safari, Firefox) with WebRTC and Canvas support

### 1. Installation
Clone the repository and install all project dependencies:

```bash
git clone <repository-url>
cd live-funny-character-cam
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory (refer to `.env.example`):

```bash
# Gemini AI API Key (required for AI Caricature Persona generation)
GEMINI_API_KEY="your-gemini-api-key-here"

# Optional App hosting URL
APP_URL="http://localhost:3000"
```

> **Note**: Even if no Gemini API key is configured or free-tier quotas are exhausted, all AR face filters, face motion tracking, selfies, photo booth strips, voice effects, and video recording operate with 100% functionality with built-in creative fallback personas.

### 3. Development Server
Start the full-stack development server on port `3000`:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. When prompted, grant camera and microphone permissions.

### 4. Production Build
Compile TypeScript and bundle the frontend for production:

```bash
npm run build
npm start
```

---

## 📡 API Reference

### `POST /api/ai/transform-character`
Analyzes a snapshot image and returns a humorous comic character profile.

- **Request Body**:
  ```json
  {
    "imageBase64": "data:image/jpeg;base64,...",
    "style": "cartoon-comic"
  }
  ```
- **Response**:
  ```json
  {
    "characterName": "Neon Tiger Claw",
    "archetype": "Cybernetic Jungle Hero",
    "power": "Emits supersonic purrs that disable lasers",
    "weakness": "Distracted by shiny laser pointers",
    "catchphrase": "Rawr into the future!",
    "backstory": "A guardian of neon alleys who gained cosmic stripes.",
    "soundEffect": "ROAR-ZAP!",
    "suggestedFilter": "tiger",
    "ratingBadge": "Legendary Hero"
  }
  ```

### `POST /api/ai/character-voice`
Synthesizes a character catchphrase into spoken audio using Gemini TTS.

- **Request Body**:
  ```json
  {
    "text": "Rawr into the future!",
    "voiceName": "Puck"
  }
  ```
- **Response**:
  ```json
  {
    "audioBase64": "UklGRi...",
    "mimeType": "audio/wav"
  }
  ```

---

## 🔒 Security & Privacy
- **Client-Side Processing**: Camera video frames and facial motion analysis are computed entirely client-side inside the browser's Canvas execution context. No raw camera video is ever streamed to external servers.
- **Local Storage**: Captured photos, comic strips, and videos reside in browser `localStorage` and memory Blob URLs under user control.

---

## 📄 License
This project is licensed under the Apache-2.0 License.
