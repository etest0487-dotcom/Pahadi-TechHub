/**
 * Web Audio API procedural Himalayan Soundscape Synthesizer
 * Generates realistic, serene mountain ambient audio loops:
 * 1. Mountain Wind / Pine Valley Breeze (filtered modulated noise)
 * 2. Sacred Temple Bells & Singing Bowl Chimes (inharmonic decaying partials)
 * 3. Himalayan Gadera / Mountain Brook Stream (filtered liquid ripples)
 * Completely offline, zero external audio URLs.
 */

export type SoundscapePreset = 'breeze_bells' | 'stream' | 'temple_chimes';

class HimalayanSoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private currentPreset: SoundscapePreset = 'breeze_bells';
  private masterGain: GainNode | null = null;
  private volume: number = 0.35; // Calm, subtle background default

  // Noise generators & nodes
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private lfoOsc: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;

  // Periodic bell timer
  private bellIntervalId: NodeJS.Timeout | null = null;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /** Synthesizes continuous brown/pink noise buffer for wind/water */
  private createNoiseBuffer(ctx: AudioContext, seconds: number = 5): AudioBuffer {
    const bufferSize = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise integration for soft mountain wind
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
    return buffer;
  }

  /** Strikes a resonant Himalayan temple bell with inharmonic partials */
  public strikeTempleBell(pitch: number = 523.25) { // C5
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    // Frequencies of brass bell inharmonic modes: 1x, 2.0x, 3.01x, 4.2x
    const partials = [
      { ratio: 1.0, gain: 0.3, decay: 4.5 },
      { ratio: 2.01, gain: 0.18, decay: 3.2 },
      { ratio: 3.02, gain: 0.12, decay: 2.2 },
      { ratio: 4.18, gain: 0.06, decay: 1.5 },
    ];

    const now = ctx.currentTime;

    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      const pGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch * p.ratio, now);

      pGain.gain.setValueAtTime(0, now);
      pGain.gain.linearRampToValueAtTime(p.gain, now + 0.015);
      pGain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

      osc.connect(pGain);
      pGain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + p.decay);
    });
  }

  public start(preset: SoundscapePreset = 'breeze_bells') {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    if (this.isRunning) {
      this.stop();
    }

    this.currentPreset = preset;
    this.isRunning = true;

    // Master Volume Node
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
    this.masterGain.connect(ctx.destination);

    // 1. Setup continuous mountain wind / water noise loop
    const noiseBuffer = this.createNoiseBuffer(ctx, 4);
    this.noiseNode = ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Filter node
    this.filterNode = ctx.createBiquadFilter();

    if (preset === 'stream') {
      // Flowing mountain brook filter: bandpass with gentle bubbling
      this.filterNode.type = 'bandpass';
      this.filterNode.frequency.setValueAtTime(450, ctx.currentTime);
      this.filterNode.Q.setValueAtTime(2.0, ctx.currentTime);

      this.lfoOsc = ctx.createOscillator();
      this.lfoGain = ctx.createGain();
      this.lfoOsc.frequency.setValueAtTime(0.4, ctx.currentTime); // ripple speed
      this.lfoGain.gain.setValueAtTime(120, ctx.currentTime);
      this.lfoOsc.connect(this.lfoGain);
      this.lfoGain.connect(this.filterNode.frequency);
      this.lfoOsc.start();
    } else {
      // Mountain Pine Breeze: lowpass with slow breathing LFO
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(220, ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.2, ctx.currentTime);

      this.lfoOsc = ctx.createOscillator();
      this.lfoGain = ctx.createGain();
      this.lfoOsc.frequency.setValueAtTime(0.12, ctx.currentTime); // 8-second calm breathing cycle
      this.lfoGain.gain.setValueAtTime(90, ctx.currentTime);
      this.lfoOsc.connect(this.lfoGain);
      this.lfoGain.connect(this.filterNode.frequency);
      this.lfoOsc.start();
    }

    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.masterGain);
    this.noiseNode.start();

    // 2. Setup periodic Temple Bell strikes
    if (preset === 'breeze_bells' || preset === 'temple_chimes') {
      const bellIntervalMs = preset === 'temple_chimes' ? 6000 : 11000;
      // Strike once soon after start
      setTimeout(() => {
        if (this.isRunning) this.strikeTempleBell(preset === 'temple_chimes' ? 440 : 587.33);
      }, 1500);

      this.bellIntervalId = setInterval(() => {
        if (!this.isRunning) return;
        const pitches = [440, 523.25, 587.33, 659.25];
        const randomPitch = pitches[Math.floor(Math.random() * pitches.length)];
        this.strikeTempleBell(randomPitch);
      }, bellIntervalMs);
    }
  }

  public stop() {
    this.isRunning = false;

    if (this.bellIntervalId) {
      clearInterval(this.bellIntervalId);
      this.bellIntervalId = null;
    }

    if (this.lfoOsc) {
      try {
        this.lfoOsc.stop();
        this.lfoOsc.disconnect();
      } catch {}
      this.lfoOsc = null;
    }

    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {}
      this.noiseNode = null;
    }

    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      } catch {}
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public isPlaying(): boolean {
    return this.isRunning;
  }

  public getPreset(): SoundscapePreset {
    return this.currentPreset;
  }
}

export const himalayanSoundscape = new HimalayanSoundscapeEngine();
