import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Character transformation analysis
app.post('/api/ai/transform-character', async (req: Request, res: Response) => {
  const { imageBase64, style = 'cartoon-comic' } = req.body;

  if (!imageBase64) {
    res.status(400).json({ error: 'Image base64 data is required' });
    return;
  }

  // Pre-compiled list of hilarious creative personas for fallback / rate limit handling
  const comedyPersonas = [
    {
      characterName: 'Captain Wobblebot',
      archetype: 'Space Disco Cyborg',
      power: 'Shoots dazzling rainbow glitter beams from sunglasses whenever excited',
      weakness: 'Cannot resist breaking into dance whenever funk music is played',
      catchphrase: 'BEEP BOOP! That selfie was 100% interstellar fabulousness!',
      backstory: 'Created in an underground laboratory to be the ultimate party machine, now roaming Earth for the finest snacks.',
      soundEffect: 'BOING-ZAP!',
      suggestedFilter: 'robot',
      ratingBadge: 'Level 99 Party Animal',
    },
    {
      characterName: 'Baron von Chuckles',
      archetype: 'Whimsical Cartoon Explorer',
      power: 'Can make anyone smile by just wiggling eyebrows and ears',
      weakness: 'Terrified of lukewarm lemonade and slippery bananas',
      catchphrase: 'Prepare to be thoroughly amused, mortal!',
      backstory: 'Escaped from a vintage comic book during an unexpected paper jam. Has been partying across galaxies ever since.',
      soundEffect: 'HONK-BOING!',
      suggestedFilter: 'clown',
      ratingBadge: '100% Comic Relief',
    },
    {
      characterName: 'Sir Bark-a-Lot',
      archetype: 'Galactic Treat Detective',
      power: 'Can sniff out pizza and cheddar cheese from 4.2 light-years away',
      weakness: 'Vulnerable to gentle belly rubs and squeaky rubber toys',
      catchphrase: 'Woof to infinity and beyond! Freeze, put down the chew toy!',
      backstory: 'Former stray pup who accidentally ate a glowing meteor snack and gained cosmically fluffy superpowers.',
      soundEffect: 'ARF-ZOOM!',
      suggestedFilter: 'doggo',
      ratingBadge: 'Maximum Good Boy',
    },
    {
      characterName: 'Nebula Noodle',
      archetype: 'Interdimensional Taco Wizard',
      power: 'Summons floating guacamole shields and levitating spicy tacos',
      weakness: 'Melts slightly when hearing smooth jazz saxophone solos',
      catchphrase: 'By the salsa of the cosmos, behold my taco power!',
      backstory: 'Graduated top of his class from the Cosmic Academy of Flavor before embarking on a quest for the ultimate crunch.',
      soundEffect: 'SZZZL-CRUNCH!',
      suggestedFilter: 'wizard',
      ratingBadge: 'Extra Spicy',
    },
    {
      characterName: 'Neon Paws 3000',
      archetype: 'Cybernetic Whisker Assassin',
      power: 'Knocks cups off intergalactic kitchen counters with telekinetic laser paws',
      weakness: 'Hypnotized by any red laser pointer in the galaxy',
      catchphrase: 'Purr-pare for total mischief! Meow or never!',
      backstory: 'Cyber-enhanced feline champion of the underground alleyways with 9,000 lives to spare.',
      soundEffect: 'MEOW-BLAST!',
      suggestedFilter: 'kitty',
      ratingBadge: '999% Sass',
    },
    {
      characterName: 'Sheriff Sunbeam',
      archetype: 'Wild West Solar Outlaw',
      power: 'Fastest mustache twirl in the known universe',
      weakness: 'Tumbleweeds making him sneeze uncontrollably',
      catchphrase: 'This town ain\'t big enough for anything less than pure fun, partner!',
      backstory: 'Wandered into the dusty frontier chasing a runaway gold coin, became legendary for his golden handlebar mustache.',
      soundEffect: 'YEE-HAW-ZAP!',
      suggestedFilter: 'cowboy',
      ratingBadge: 'Gold Star Legend',
    }
  ];

  const randomFallback = comedyPersonas[Math.floor(Math.random() * comedyPersonas.length)];

  if (!ai) {
    res.json(randomFallback);
    return;
  }

  // Clean image data prefix if present
  const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

  const prompt = `Analyze this selfie/person in the photo and transform them into a hilarious, lovable, over-the-top cartoon character or comic hero (Style: ${style}).
Generate a funny, playful character profile with witty comedic flair. Be friendly, lighthearted, and wildly imaginative.

Return JSON strictly matching this schema:
- characterName: a funny, creative superhero or cartoon character name
- archetype: e.g. "Caffeinated Goblin King", "Galactic Disco Pug", "Time-Traveling Taco Wizard"
- power: a hilarious, ridiculously specific superpower
- weakness: a comical Achilles' heel or weakness
- catchphrase: a punchy, hilarious 1-line quote they would shout in a cartoon
- backstory: a 2-sentence quirky comic origin story
- soundEffect: an onomatopoeia sound effect in all-caps (e.g. "KABOOM!", "SQUEEEE!", "ZAP-WHACK!")
- suggestedFilter: one of: "doggo", "cat", "alien", "cowboy", "wizard", "robot", "clown", "thuglife", "zombie", "warp"
- ratingBadge: a funny 2-4 word stat badge (e.g. "Chunky Charisma 100%", "98% Extra Fluffy")`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            characterName: { type: Type.STRING },
            archetype: { type: Type.STRING },
            power: { type: Type.STRING },
            weakness: { type: Type.STRING },
            catchphrase: { type: Type.STRING },
            backstory: { type: Type.STRING },
            soundEffect: { type: Type.STRING },
            suggestedFilter: { type: Type.STRING },
            ratingBadge: { type: Type.STRING },
          },
          required: [
            'characterName',
            'archetype',
            'power',
            'weakness',
            'catchphrase',
            'backstory',
            'soundEffect',
            'suggestedFilter',
            'ratingBadge',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.characterName) {
      res.json(parsed);
      return;
    }
    res.json(randomFallback);
  } catch (err: any) {
    console.warn('Gemini transformation error (using creative comedy persona fallback):', err?.message || err);
    // Graceful fallback whenever quota 429 or any API limits happen
    res.json(randomFallback);
  }
});

// Character voice synthesis via Gemini TTS
app.post('/api/ai/character-voice', async (req: Request, res: Response) => {
  try {
    const { text, voice = 'Puck' } = req.body;

    if (!text) {
      res.status(400).json({ error: 'Text is required for voice generation' });
      return;
    }

    if (!ai) {
      res.status(200).json({ audioBase64: null, note: 'TTS unavailable without API key' });
      return;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text.slice(0, 200),
              speechMetadata: {
                style: 'Excited cartoon character voice with cheerful comedic inflection',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: voice === 'Fenrir' ? 'Fenrir' : voice === 'Kore' ? 'Kore' : 'Puck',
            },
          },
        },
      },
    });

    const audioBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    res.json({ audioBase64: audioBase64 || null });
  } catch (err: any) {
    console.warn('TTS generation skipped or errored:', err?.message || err);
    res.json({ audioBase64: null, fallbackWebSpeech: true });
  }
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', hasGeminiKey: !!apiKey });
});

// Dev vs Prod Vite setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Live Character Cam server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
