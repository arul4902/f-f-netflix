// Web Audio API synthesized cinematic sound effects (Zero external files needed)

class SoundFX {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Iconic deep cinematic opening chord ("Ta-Dum" feel)
   */
  playCinematicChord() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Deep rich bass note (D2 ~ 73.4Hz)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(73.4, now);
      osc1.frequency.exponentialRampToValueAtTime(70.0, now + 1.8);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.35, now + 0.1);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      // Warm Fifth note (A2 ~ 110Hz)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110.0, now + 0.05);

      gain2.gain.setValueAtTime(0.001, now + 0.05);
      gain2.gain.linearRampToValueAtTime(0.25, now + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

      // Golden shimmering high harmonic (F#3 ~ 185Hz & D4 ~ 293.66Hz)
      const osc3 = this.ctx.createOscillator();
      const gain3 = this.ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(293.66, now + 0.12);

      gain3.gain.setValueAtTime(0.001, now + 0.12);
      gain3.gain.linearRampToValueAtTime(0.18, now + 0.3);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      // Filter for warm cinematic analog warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);
      filter.frequency.linearRampToValueAtTime(850, now + 0.4);
      filter.frequency.exponentialRampToValueAtTime(300, now + 2.0);

      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);

      gain1.connect(filter);
      gain2.connect(filter);
      gain3.connect(filter);

      filter.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.05);
      osc3.start(now + 0.12);

      osc1.stop(now + 2.3);
      osc2.stop(now + 2.5);
      osc3.stop(now + 2.2);
    } catch {
      // Audio context might be blocked prior to user interaction
    }
  }

  /**
   * Subtle golden chime click when tapping interactive elements
   */
  playChime(pitch: number = 880) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, now + 0.15);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Ignore
    }
  }
}

export const soundFX = new SoundFX();
