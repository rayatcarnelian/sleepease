/**
 * Audio generator using the Web Audio API.
 * Creates calming sounds programmatically — no external CDN needed.
 */

let audioContext: AudioContext | null = null;
let activeNodes: AudioNode[] = [];
let activeSource: { stop: () => void } | null = null;

function getCtx(): AudioContext {
  if (!audioContext) audioContext = new AudioContext();
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

function cleanup() {
  if (activeSource) { try { activeSource.stop(); } catch {} activeSource = null; }
  activeNodes.forEach(n => { try { n.disconnect(); } catch {} });
  activeNodes = [];
}

/* ─── Binaural Beats (Deep Listening) ─── */
function createBinauralBeats(ctx: AudioContext, dest: AudioNode) {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  osc1.type = 'sine'; osc1.frequency.value = 200;
  osc2.type = 'sine'; osc2.frequency.value = 210; // 10Hz alpha wave diff
  gain.gain.value = 0.15;
  osc1.connect(gain); osc2.connect(gain); gain.connect(dest);
  osc1.start(); osc2.start();
  activeNodes.push(osc1, osc2, gain);
  return { stop: () => { osc1.stop(); osc2.stop(); } };
}

/* ─── Ocean Waves ─── */
function createOceanWaves(ctx: AudioContext, dest: AudioNode) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer; noise.loop = true;
  
  const lpf = ctx.createBiquadFilter();
  lpf.type = 'lowpass'; lpf.frequency.value = 400; lpf.Q.value = 1;
  
  const gain = ctx.createGain();
  gain.gain.value = 0;
  
  // Simulate wave cycles with gain automation
  const now = ctx.currentTime;
  for (let i = 0; i < 200; i++) {
    const t = now + i * 4;
    gain.gain.setValueAtTime(0.02, t);
    gain.gain.linearRampToValueAtTime(0.18, t + 1.5);
    gain.gain.linearRampToValueAtTime(0.05, t + 3.5);
  }
  
  noise.connect(lpf); lpf.connect(gain); gain.connect(dest);
  noise.start();
  activeNodes.push(noise, lpf, gain);
  return { stop: () => noise.stop() };
}

/* ─── Rain Drops ─── */
function createRainDrops(ctx: AudioContext, dest: AudioNode) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer; noise.loop = true;
  
  const bpf = ctx.createBiquadFilter();
  bpf.type = 'bandpass'; bpf.frequency.value = 3000; bpf.Q.value = 0.5;
  
  const lpf = ctx.createBiquadFilter();
  lpf.type = 'lowpass'; lpf.frequency.value = 8000;
  
  const gain = ctx.createGain();
  gain.gain.value = 0.12;
  
  noise.connect(bpf); bpf.connect(lpf); lpf.connect(gain); gain.connect(dest);
  noise.start();
  activeNodes.push(noise, bpf, lpf, gain);
  return { stop: () => noise.stop() };
}

/* ─── Ambient Piano ─── */
function createAmbientPiano(ctx: AudioContext, dest: AudioNode) {
  const chordNotes = [
    [261.63, 329.63, 392.00], // C major
    [293.66, 369.99, 440.00], // D major  
    [246.94, 311.13, 369.99], // B minor
    [220.00, 277.18, 329.63], // A minor
  ];
  
  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.08;
  masterGain.connect(dest);
  activeNodes.push(masterGain);
  
  const reverb = ctx.createConvolver();
  const reverbLen = ctx.sampleRate * 3;
  const reverbBuf = ctx.createBuffer(2, reverbLen, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = reverbBuf.getChannelData(ch);
    for (let i = 0; i < reverbLen; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 1.2));
  }
  reverb.buffer = reverbBuf;
  reverb.connect(masterGain);
  activeNodes.push(reverb);
  
  const stops: (() => void)[] = [];
  const now = ctx.currentTime;
  
  for (let rep = 0; rep < 50; rep++) {
    chordNotes.forEach((chord, ci) => {
      const startTime = now + (rep * chordNotes.length + ci) * 6;
      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const env = ctx.createGain();
        env.gain.setValueAtTime(0, startTime);
        env.gain.linearRampToValueAtTime(0.6, startTime + 0.3);
        env.gain.exponentialRampToValueAtTime(0.001, startTime + 5.5);
        osc.connect(env); env.connect(reverb);
        osc.start(startTime); osc.stop(startTime + 6);
        activeNodes.push(osc, env);
        stops.push(() => { try { osc.stop(); } catch {} });
      });
    });
  }
  
  return { stop: () => stops.forEach(s => s()) };
}

/* ─── Wind in Trees ─── */
function createWindInTrees(ctx: AudioContext, dest: AudioNode) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer; noise.loop = true;
  
  const lpf = ctx.createBiquadFilter();
  lpf.type = 'lowpass'; lpf.frequency.value = 200; lpf.Q.value = 0.7;
  
  const gain = ctx.createGain();
  gain.gain.value = 0;
  
  // Gentle wind gusts
  const now = ctx.currentTime;
  for (let i = 0; i < 200; i++) {
    const t = now + i * 5;
    const vol = 0.08 + Math.random() * 0.12;
    gain.gain.setValueAtTime(0.04, t);
    gain.gain.linearRampToValueAtTime(vol, t + 2);
    gain.gain.linearRampToValueAtTime(0.04, t + 4.5);
  }
  
  // Modulate filter for whistling effect
  const lfo = ctx.createOscillator();
  lfo.type = 'sine'; lfo.frequency.value = 0.15;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 150;
  lfo.connect(lfoGain); lfoGain.connect(lpf.frequency);
  lfo.start();
  
  noise.connect(lpf); lpf.connect(gain); gain.connect(dest);
  noise.start();
  activeNodes.push(noise, lpf, gain, lfo, lfoGain);
  return { stop: () => { noise.stop(); lfo.stop(); } };
}

/* ─── Gentle Flow (ambient drone) ─── */
function createGentleFlow(ctx: AudioContext, dest: AudioNode) {
  const freqs = [130.81, 196.00, 261.63]; // C3, G3, C4 — open fifth drone
  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.06;
  masterGain.connect(dest);
  activeNodes.push(masterGain);
  
  const stops: (() => void)[] = [];
  
  freqs.forEach((freq) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.05 + Math.random() * 0.1;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 3;
    lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
    lfo.start();
    
    const gain = ctx.createGain();
    gain.gain.value = 0.5;
    osc.connect(gain); gain.connect(masterGain);
    osc.start();
    activeNodes.push(osc, lfo, lfoGain, gain);
    stops.push(() => { osc.stop(); lfo.stop(); });
  });
  
  // Add gentle noise layer
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer; noise.loop = true;
  const lpf = ctx.createBiquadFilter();
  lpf.type = 'lowpass'; lpf.frequency.value = 300;
  const nGain = ctx.createGain();
  nGain.gain.value = 0.03;
  noise.connect(lpf); lpf.connect(nGain); nGain.connect(masterGain);
  noise.start();
  activeNodes.push(noise, lpf, nGain);
  stops.push(() => noise.stop());
  
  return { stop: () => stops.forEach(s => s()) };
}

/* ─── Public API ─── */
export type TrackType = 'binaural' | 'ocean' | 'rain' | 'piano' | 'wind' | 'gentle';

const generators: Record<TrackType, (ctx: AudioContext, dest: AudioNode) => { stop: () => void }> = {
  binaural: createBinauralBeats,
  ocean: createOceanWaves,
  rain: createRainDrops,
  piano: createAmbientPiano,
  wind: createWindInTrees,
  gentle: createGentleFlow,
};

export function startAudio(type: TrackType): void {
  cleanup();
  const ctx = getCtx();
  activeSource = generators[type](ctx, ctx.destination);
}

export function stopAudio(): void {
  cleanup();
}

export function isAudioContextReady(): boolean {
  return audioContext !== null && audioContext.state === 'running';
}
