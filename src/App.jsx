import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, CheckCircle2, ChevronRight, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ROSSO = '#EA0B2F';
const CARBON = '#0B0E14';
const STEEL = '#6A82A0';

// --- COMPONENT: COCKPIT CHROME (global overlay) ---
const CockpitChrome = () => (
  <>
    {/* top rosso rail */}
    <div className="fixed top-0 left-0 w-full h-[2px] z-[45] pointer-events-none"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(234,11,47,0.7) 50%, transparent)' }} />
    {/* viewport corner brackets */}
    <span className="cockpit-bracket top-3 left-3 border-t border-l" />
    <span className="cockpit-bracket top-3 right-3 border-t border-r" />
    <span className="cockpit-bracket bottom-3 left-3 border-b border-l" />
    <span className="cockpit-bracket bottom-3 right-3 border-b border-r" />
    {/* scanline texture */}
    <div className="cockpit-scanlines" />
  </>
);

// --- COMPONENT: NAVBAR ---
const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
          if (self.progress > 0) {
            gsap.to(navRef.current, { backgroundColor: 'rgba(11, 14, 20, 0.82)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(234,11,47,0.18)', duration: 0.3 });
          } else {
            gsap.to(navRef.current, { backgroundColor: 'rgba(11, 14, 20, 0)', backdropFilter: 'blur(0px)', borderBottom: '1px solid rgba(234,11,47,0)', duration: 0.3 });
          }
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 shrink-0">
          <img src="/logo.svg" alt="Dad Strength" className="h-10 w-auto object-contain" />
          <span className="hidden sm:block font-display font-semibold tracking-[0.18em] uppercase text-titanium text-sm">Dad Strength</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-display font-semibold tracking-[0.14em] uppercase text-steel">
          <a href="#philosophy" className="hover:text-titanium hover:-translate-y-[1px] transition-all">Doctrine</a>
          <a href="#protocol" className="hover:text-titanium hover:-translate-y-[1px] transition-all">Protocol</a>
          <a href="#pricing" className="hover:text-titanium hover:-translate-y-[1px] transition-all">Access</a>
        </div>
        <div>
          <button className="panel-cut-sm group relative bg-rosso text-titanium px-6 py-2.5 font-display font-bold text-xs uppercase tracking-[0.14em] hover:mecha-glow transition-all duration-300">
            <span className="relative z-10 flex items-center gap-2">Get the App <ChevronRight size={15} /></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- COMPONENT: HERO ---
const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-anim', {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.2
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full flex items-end pb-24 lg:pb-32 px-6">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=80"
          alt="Heavy Barbell"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'grayscale(0.35) contrast(1.05)' }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${CARBON} 8%, rgba(11,14,20,0.86) 45%, rgba(11,14,20,0.35) 100%)` }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 20% 100%, rgba(234,11,47,0.12), transparent 60%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl livery-slash pl-2">
          <p className="hero-anim telemetry mb-5">SYS // DAD.OS · SYSTEMS ONLINE</p>
          <h1 className="flex flex-col gap-1">
            <span className="hero-anim text-3xl md:text-5xl font-display font-medium tracking-[0.06em] text-titanium leading-none uppercase">Lead by</span>
            <span className="hero-anim text-6xl md:text-8xl lg:text-[130px] font-display font-bold text-rosso leading-[0.9] tracking-tight uppercase" style={{ textShadow: '0 0 40px rgba(234,11,47,0.35)' }}>Example.</span>
          </h1>
          <p className="hero-anim mt-8 text-base md:text-lg font-mono text-ink/80 max-w-xl">
            The daily operating system for fathers who train, think, and lead.
          </p>
          <div className="hero-anim mt-10 flex flex-col sm:flex-row gap-4">
            <button className="panel-cut-sm bg-rosso text-titanium px-8 py-4 font-display font-bold text-sm uppercase tracking-[0.12em] hover:mecha-glow transition-all duration-300">
              Download the App
            </button>
            <a href="#protocol" className="panel-cut-sm px-8 py-4 font-display font-bold text-sm uppercase tracking-[0.12em] text-ink border border-edge hover:border-rosso/60 hover:text-titanium hover:-translate-y-[1px] transition-all duration-300 text-center">
              See the Protocol
            </a>
          </div>
          {/* telemetry stat strip */}
          <div className="hero-anim mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {[['18 MIN', 'PER SESSION'], ['3', 'TRAINING PATHS'], ['DAILY', 'AI DEBRIEF'], ['0%', 'FLUFF']].map(([n, l]) => (
              <div key={l} className="flex flex-col">
                <span className="readout-num text-2xl text-titanium">{n}</span>
                <span className="telemetry-dim mt-1">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: DIAGNOSTIC SHUFFLER (Features 1) ---
const DiagnosticShuffler = () => {
  const [cards, setCards] = useState(['Carry the Kid', 'Move the Couch', 'One Trip Groceries', 'Be a Superhero']);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const n = [...prev];
        n.unshift(n.pop());
        return n;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel-cut hud-frame bg-panel border border-edge p-8 pt-9 relative h-[320px] flex flex-col">
      <span className="panel-id">FTR-01 // UTILITY</span>
      <h3 className="text-xl font-display font-semibold uppercase tracking-wide text-titanium mb-1">Real-Life Utility</h3>
      <p className="telemetry-dim mb-8">Body · Mind · Spirit</p>
      <div className="relative flex-1 flex items-center justify-center">
        {cards.map((card, i) => (
          <div
            key={card}
            className="panel-cut-sm absolute w-full px-6 py-4 bg-carbon-2 text-titanium border border-edge flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{ transform: `translateY(${i * 15}px) scale(${1 - i * 0.05})`, opacity: 1 - i * 0.2, zIndex: 10 - i }}
          >
            <CheckCircle2 size={20} className="text-rosso" />
            <span className="font-display font-semibold tracking-wide uppercase text-sm">{card}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENT: TELEMETRY TYPEWRITER (Features 2) ---
const TelemetryTypewriter = () => {
  const fullText = "THE SQUEEZE: 18-MINUTE SESSIONS.\nTHREE PILLARS: BODY · MIND · SPIRIT.\nFATHERHOOD IS THE MISSION, NOT THE OBSTACLE.\nDETERMINISTIC PROGRAMMING. ZERO FLUFF.";
  const [text, setText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) index = 0;
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel-cut hud-frame bg-panel border border-edge p-8 pt-9 relative flex flex-col h-[320px]">
      <span className="panel-id">FTR-02 // FEED</span>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-display font-semibold uppercase tracking-wide text-titanium">Zero-Fluff Protocols</h3>
        <div className="flex items-center gap-2 telemetry px-2 py-1 border border-rosso/30">
          <span className="status-dot" /> LIVE
        </div>
      </div>
      <div className="panel-cut-sm flex-1 bg-carbon/70 p-4 border border-edge overflow-hidden">
        <pre className="font-mono text-sm text-ink/80 whitespace-pre-wrap leading-relaxed">
          {text}<span className="inline-block w-2.5 h-4 bg-rosso ml-1 align-middle animate-pulse" />
        </pre>
      </div>
    </div>
  );
};

// --- COMPONENT: CURSOR SCHEDULER (Features 3) ---
const CursorScheduler = () => {
  const cursorRef = useRef(null);
  const dayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.to(cursorRef.current, { x: 80, y: 30, duration: 1, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .to(dayRef.current, { backgroundColor: ROSSO, color: CARBON, borderColor: ROSSO, duration: 0.1 }, "<")
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(cursorRef.current, { x: 190, y: 120, duration: 1, ease: "power2.inOut", delay: 0.5 })
        .to(cursorRef.current, { opacity: 0, duration: 0.3 })
        .to(dayRef.current, { backgroundColor: 'transparent', color: STEEL, borderColor: 'rgba(30,44,62,1)', duration: 0.1, delay: 0.5 })
        .set(cursorRef.current, { x: -20, y: 150, opacity: 1 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="panel-cut hud-frame bg-panel border border-edge p-8 pt-9 h-[320px] flex flex-col relative overflow-hidden">
      <span className="panel-id">FTR-03 // IDENTITY</span>
      <h3 className="text-xl font-display font-semibold uppercase tracking-wide text-titanium mb-1">Consistent Identity</h3>
      <p className="telemetry-dim mb-6">Show up. Lead by action.</p>

      <div className="grid grid-cols-7 gap-2 mb-4 relative z-10">
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} ref={i === 2 ? dayRef : null} className="aspect-square flex items-center justify-center font-mono text-sm border border-edge text-steel transition-colors">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-auto flex justify-end">
        <button className="panel-cut-sm px-4 py-2 bg-carbon-2 border border-edge text-xs font-display font-bold uppercase tracking-[0.14em] text-titanium">Execute</button>
      </div>

      <div ref={cursorRef} className="absolute left-6 top-20 z-20" style={{ transform: 'translate(0px, 0px)' }}>
        <MousePointer2 className="text-titanium drop-shadow-md" size={28} fill={CARBON} />
      </div>
    </div>
  );
};

// --- COMPONENT: FEATURES WRAPPER ---
const Features = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="readout-rule mb-10 max-w-xs" />
    <div className="grid md:grid-cols-3 gap-6">
      <DiagnosticShuffler />
      <TelemetryTypewriter />
      <CursorScheduler />
    </div>
  </section>
);

// --- COMPONENT: PHILOSOPHY ---
const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        y: 40, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="relative py-40 px-6 overflow-hidden bg-panel border-y border-edge">
      <div className="hazard absolute top-0 left-0 w-full" />
      <div className="max-w-5xl mx-auto relative z-10 livery-slash pl-4">
        <p className="phil-line telemetry mb-8">SYS // DOCTRINE</p>
        <p className="phil-line text-xl md:text-2xl font-mono text-steel mb-8">
          Most fitness treats fatherhood as the obstacle in your way.
        </p>
        <p className="phil-line text-4xl md:text-7xl font-display font-medium text-titanium leading-tight uppercase tracking-tight">
          We treat it as<br/>
          <span className="text-rosso font-bold" style={{ textShadow: '0 0 40px rgba(234,11,47,0.3)' }}>The Mission.</span>
        </p>
      </div>
    </section>
  );
};

// --- COMPONENT: PROTOCOL (Sticky Stacking) ---
const ProtocolCard = ({ index, code, title, text, Graphic }) => (
  <div className="protocol-card min-h-screen flex items-center justify-center sticky top-0 px-6">
    <div className="stage panel-cut hud-frame w-full max-w-5xl bg-panel border border-edge p-12 md:p-20 relative flex flex-col md:flex-row items-center gap-12">
      <span className="panel-id">{code}</span>
      <div className="md:w-1/2">
        <div className="telemetry mb-6">STEP 0{index}</div>
        <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-6 text-titanium">{title}</h2>
        <p className="text-lg text-ink/80 font-mono leading-relaxed">{text}</p>
      </div>
      <div className="md:w-1/2 flex justify-center opacity-80">
        <Graphic />
      </div>
    </div>
  </div>
);

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card, start: "top top", endTrigger: cards[i + 1],
            end: "top top", pin: true, pinSpacing: false
          });
          gsap.to(card.querySelector('.stage'), {
            scale: 0.9, opacity: 0.3, filter: 'blur(10px)',
            scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top top", scrub: true }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="protocol" className="relative pb-24 pt-12">
      <ProtocolCard
        index={1} code="PRO-01 // SQUEEZE" title="The Squeeze"
        text="18-minute sessions. Built for the guy with a baby on the floor and zero margin for fluff."
        Graphic={() => (
          <svg viewBox="0 0 100 100" className="w-48 h-48 animate-[spin_10s_linear_infinite]">
            <circle cx="50" cy="50" r="40" fill="none" stroke={ROSSO} strokeWidth="2" strokeDasharray="10 5" />
            <circle cx="50" cy="50" r="25" fill="none" stroke={STEEL} strokeWidth="4" />
          </svg>
        )}
      />
      <ProtocolCard
        index={2} code="PRO-02 // DAD.SCORE" title="Dad Score"
        text="A holistic readout for the modern father. Track Body, Mind, and Spirit daily — one number that keeps you honest."
        Graphic={() => (
          <div className="panel-cut-sm w-full h-48 border border-edge relative overflow-hidden flex items-center bg-carbon">
            <div className="absolute top-0 bottom-0 w-1 bg-rosso" style={{ boxShadow: `0 0 15px ${ROSSO}`, animation: 'scan 3s ease-in-out infinite alternate' }} />
            <style>{`@keyframes scan { 0% { left: 0; } 100% { left: 100%; } }`}</style>
            <div className="w-full border-t border-dashed border-edge" />
          </div>
        )}
      />
      <ProtocolCard
        index={3} code="PRO-03 // PROGRAMS" title="Three Paths"
        text="Dad Strong, Hybrid Power, Hybrid Endurance. Percentage-based, deterministic programming — progressed for you, never AI-guessed."
        Graphic={() => (
          <div className="flex items-end gap-4 h-48">
            {[[0.55, 'DAD STRONG'], [1, 'HYBRID PWR'], [0.78, 'HYBRID END']].map(([h, l], i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="panel-cut-sm w-12 border border-edge bg-carbon-2 relative overflow-hidden" style={{ height: `${h * 160}px` }}>
                  <div className="absolute bottom-0 left-0 w-full bg-rosso" style={{ height: '38%', boxShadow: `0 0 14px ${ROSSO}` }} />
                </div>
                <span className="telemetry-dim" style={{ fontSize: '7px' }}>{l}</span>
              </div>
            ))}
          </div>
        )}
      />
    </section>
  );
};

// --- COMPONENT: PRICING ---
const Pricing = () => (
  <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <p className="telemetry mb-4">SYS // ACCESS.TIERS</p>
      <h2 className="text-5xl font-display font-bold uppercase tracking-tight mb-4 text-titanium">Access the OS.</h2>
      <p className="font-mono text-steel text-lg">One system. Zero fluff.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 items-center">
      {/* Tier 1 */}
      <div className="panel-cut relative bg-panel border border-edge p-8 pt-9">
        <span className="panel-id">TIER // FREE</span>
        <h3 className="text-2xl font-display font-bold uppercase tracking-wide mb-2 text-titanium">Free Forever</h3>
        <p className="font-mono text-steel text-sm mb-6 pb-6 border-b border-edge">The absolute basics.</p>
        <div className="readout-num text-4xl font-bold mb-8 text-titanium">$0</div>
        <ul className="space-y-4 font-mono text-sm mb-2 text-ink/80">
          <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-rosso" />1 Program</li>
          <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-rosso" />The Squeeze (Preview)</li>
          <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-rosso" />Dad Score Tracker</li>
        </ul>
      </div>

      {/* Tier 2 — Founder's Pass (rosso hero) */}
      <div className="panel-cut hud-frame mecha-glow relative bg-rosso text-titanium border border-rosso p-10 pt-11 transform md:scale-105 z-10">
        <span className="panel-id" style={{ color: 'rgba(255,255,255,0.6)' }}>TIER // FOUNDER</span>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-carbon text-rosso border border-rosso px-4 py-1 telemetry">
          LAUNCH OFFER
        </div>
        <h3 className="text-2xl font-display font-bold uppercase tracking-wide mb-2">Founder&apos;s Pass</h3>
        <p className="font-mono text-titanium/70 text-sm mb-6 pb-6 border-b border-white/20">Lifetime access. Early adopters.</p>
        <div className="readout-num text-5xl font-bold mb-2">$47</div>
        <p className="telemetry mb-8" style={{ color: 'rgba(255,255,255,0.85)' }}>ONE-TIME PAYMENT</p>
        <ul className="space-y-4 font-mono text-sm mb-8 font-semibold">
          <li className="flex items-center gap-3"><CheckCircle2 size={18} />Lifetime Dad Strong+</li>
          <li className="flex items-center gap-3"><CheckCircle2 size={18} />Unlimited AI Sessions</li>
          <li className="flex items-center gap-3"><CheckCircle2 size={18} />All 3 Programs</li>
          <li className="flex items-center gap-3"><CheckCircle2 size={18} />Exclusive Founder Badge</li>
        </ul>
        <button className="panel-cut-sm w-full bg-carbon text-titanium font-display font-bold uppercase tracking-[0.12em] py-4 hover:-translate-y-[1px] transition-transform">Claim Access</button>
      </div>

      {/* Tier 3 */}
      <div className="panel-cut relative bg-panel border border-edge p-8 pt-9">
        <span className="panel-id">TIER // SUB</span>
        <h3 className="text-2xl font-display font-bold uppercase tracking-wide mb-2 text-titanium">Dad Strong+</h3>
        <p className="font-mono text-steel text-sm mb-6 pb-6 border-b border-edge">The full operating system.</p>
        <div className="readout-num text-4xl font-bold mb-8 text-titanium">$9.99<span className="text-lg text-steel">/mo</span></div>
        <ul className="space-y-4 font-mono text-sm mb-2 text-ink/80">
          <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-steel" />Unlimited Squeeze Logic</li>
          <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-steel" />AI Weekly Debriefs</li>
          <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-steel" />Full Program Library</li>
        </ul>
      </div>
    </div>
  </section>
);

// --- COMPONENT: BUILD LOG ---
const BuildLog = () => (
  <section className="py-24 px-6 max-w-5xl mx-auto">
    <div className="panel-cut hud-frame bg-panel border border-edge p-10 md:p-16 pt-12 relative">
      <span className="panel-id">SYS // BUILD.LOG</span>
      <div className="absolute top-0 right-10 w-px h-full bg-edge/60" />
      <div className="absolute top-0 right-20 w-px h-full bg-edge/40" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 telemetry border border-rosso/30 w-fit px-3 py-1 mb-8">
          <Cpu size={13} /> TRANSPARENT LOGS
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-6 text-titanium">Built in the Open.</h2>
        <p className="text-steel font-mono text-base max-w-lg mb-10">
          We document everything — scripts, code, failures, financials. Long-form transparency for men who want to see what the build actually costs.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
          <button className="panel-cut-sm bg-rosso text-titanium px-6 py-4 font-display font-bold uppercase tracking-[0.1em] text-sm flex items-center justify-between hover:mecha-glow transition-all">
            Watch the Logs <ChevronRight size={16} />
          </button>
          <button className="panel-cut-sm bg-carbon-2 text-ink border border-edge px-6 py-4 font-display font-bold uppercase tracking-[0.1em] text-sm flex items-center justify-between hover:text-titanium hover:border-rosso/50 transition-colors">
            Read the Briefs <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  </section>
);

// --- COMPONENT: CTA ---
const CTA = () => (
  <section className="py-32 px-6 max-w-5xl mx-auto text-center">
    <p className="telemetry mb-6">SYS // DEPLOY</p>
    <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight mb-8 text-titanium">Start<br/>Building.</h2>
    <p className="font-mono text-steel mb-12 max-w-2xl mx-auto text-lg">
      Get the app for the heavy lifting. Show up daily. Lead by example.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-6">
      <button className="panel-cut-sm bg-rosso text-titanium px-10 py-5 font-display font-bold uppercase tracking-[0.12em] text-lg hover:mecha-glow transition-all duration-300">
        Download the App
      </button>
      <a href="#pricing" className="panel-cut-sm px-10 py-5 font-display font-bold uppercase tracking-[0.12em] text-lg text-ink border border-edge hover:border-rosso/60 hover:text-titanium transition-all duration-300">
        See Access Tiers
      </a>
    </div>
  </section>
);

// --- COMPONENT: FOOTER ---
const Footer = () => (
  <footer className="carbon border-t border-edge pt-20 pb-10 px-10 mt-20">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
      <div>
        <img src="/logo.svg" alt="Dad Strength" className="h-10 w-auto object-contain mb-6" />
        <p className="font-mono text-sm text-steel max-w-xs mb-8">Functional strength without the alpha-bro posturing.</p>
        <div className="flex items-center gap-2 telemetry-dim">
          <span className="status-dot" /> SYSTEM OPERATIONAL
        </div>
      </div>
      <div className="flex gap-16">
        <div className="flex flex-col gap-4 text-xs font-display font-semibold uppercase tracking-[0.12em] text-steel">
          <a href="#" className="hover:text-titanium transition-colors">The App</a>
          <a href="#protocol" className="hover:text-titanium transition-colors">The Protocol</a>
          <a href="#" className="hover:text-titanium transition-colors">Build Logs</a>
        </div>
        <div className="flex flex-col gap-4 text-xs font-display font-semibold uppercase tracking-[0.12em] text-steel">
          <a href="#" className="hover:text-titanium transition-colors">Terms</a>
          <a href="#" className="hover:text-titanium transition-colors">Privacy</a>
          <a href="#" className="hover:text-titanium transition-colors">Contact</a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-edge text-center telemetry-dim">
      © 2026 DAD STRENGTH // ALL RIGHTS RESERVED
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen bg-carbon">
      <CockpitChrome />
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <BuildLog />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
