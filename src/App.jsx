import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, CheckCircle2, ChevronRight, Activity, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT: NAVBAR ---
const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
          if (self.progress > 0) {
            gsap.to(navRef.current, { backgroundColor: 'rgba(13, 17, 23, 0.8)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)', duration: 0.3 });
          } else {
            gsap.to(navRef.current, { backgroundColor: 'rgba(13, 17, 23, 0)', backdropFilter: 'blur(0px)', borderBottom: '1px solid rgba(255,255,255,0)', duration: 0.3 });
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
          <img src="/logo.svg" alt="Dad Strength Logo" className="h-10 w-auto object-contain" />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-subtext">
          <a href="#philosophy" className="hover:text-text hover:-translate-y-[1px] transition-all">Philosophy</a>
          <a href="#protocol" className="hover:text-text hover:-translate-y-[1px] transition-all">Protocol</a>
        </div>
        <div>
          <button className="group relative overflow-hidden bg-accent text-dark px-6 py-2.5 rounded-full font-bold text-sm hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
            <span className="relative z-10 flex items-center gap-2">Get the App <ChevronRight size={16} /></span>
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
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
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
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <h1 className="flex flex-col gap-2">
            <span className="hero-anim text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-text leading-none uppercase">Lead by</span>
            <span className="hero-anim text-6xl md:text-8xl lg:text-[140px] font-drama italic text-accent leading-[0.85] tracking-tight">Example.</span>
          </h1>
          <p className="hero-anim mt-8 text-lg font-mono text-subtext max-w-xl">
            The daily operating system for fathers who train, think, and lead.
          </p>
          <div className="hero-anim mt-10 flex flex-col sm:flex-row gap-4">
            <button className="group relative overflow-hidden bg-accent text-dark px-8 py-4 rounded-full font-bold text-base hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
              Download the App
            </button>
            <button className="group px-8 py-4 rounded-full font-bold text-base text-text border border-white/10 hover:bg-white/5 hover:-translate-y-[1px] transition-all duration-300">
              Join the Skool
            </button>
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
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark border border-white/5 rounded-[2rem] p-8 shadow-2xl relative h-[320px] flex flex-col">
      <h3 className="text-xl font-bold mb-2">Real Life Utility</h3>
      <p className="text-sm font-mono text-subtext mb-8">Body. Mind. Spirit. Brotherhood.</p>
      <div className="relative flex-1 flex items-center justify-center">
        {cards.map((card, i) => (
          <div 
            key={card}
            className="absolute w-full px-6 py-4 bg-primary text-text rounded-2xl border border-white/10 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center gap-3"
            style={{
              transform: `translateY(${i * 15}px) scale(${1 - i * 0.05})`,
              opacity: 1 - i * 0.2,
              zIndex: 10 - i
            }}
          >
            <CheckCircle2 size={20} className="text-accent" />
            <span className="font-bold tracking-wide">{card}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENT: TELEMETRY TYPEWRITER (Features 2) ---
const TelemetryTypewriter = () => {
  const fullText = "THE SQUEEZE: 18-MINUTE WORKOUTS.\nFOUR PILLARS: BODY, MIND, SPIRIT.\nFATHERHOOD IS THE MISSION, NOT THE OBSTACLE.\nACCOUNTABILITY REQUIRED.";
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
    <div className="bg-dark border border-white/5 rounded-[2rem] p-8 shadow-2xl flex flex-col h-[320px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Zero Fluff Protocols</h3>
        <div className="flex items-center gap-2 text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" /> LIVE FEED
        </div>
      </div>
      <div className="flex-1 bg-background/50 rounded-xl p-4 border border-white/5 overflow-hidden">
        <pre className="font-mono text-sm text-subtext whitespace-pre-wrap leading-relaxed">
          {text}<span className="inline-block w-2.5 h-4 bg-accent ml-1 align-middle animate-pulse"/>
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
        .to(dayRef.current, { backgroundColor: '#D97706', color: '#161B22', duration: 0.1 }, "<")
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(cursorRef.current, { x: 190, y: 120, duration: 1, ease: "power2.inOut", delay: 0.5 })
        .to(cursorRef.current, { opacity: 0, duration: 0.3 })
        .to(dayRef.current, { backgroundColor: 'transparent', color: '#9CA3AF', duration: 0.1, delay: 0.5 })
        .set(cursorRef.current, { x: -20, y: 150, opacity: 1 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-dark border border-white/5 rounded-[2rem] p-8 shadow-2xl h-[320px] flex flex-col relative overflow-hidden">
      <h3 className="text-xl font-bold mb-2">Consistent Identity</h3>
      <p className="text-sm font-mono text-subtext mb-6">Show up mentally. Lead by action.</p>
      
      <div className="grid grid-cols-7 gap-2 mb-4 relative z-10">
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} ref={i === 2 ? dayRef : null} className="aspect-square flex items-center justify-center font-mono text-sm border border-white/10 rounded-lg text-subtext transition-colors">
            {d}
          </div>
        ))}
      </div>
      
      <div className="mt-auto flex justify-end">
        <button className="px-4 py-2 bg-primary text-xs font-bold font-mono rounded">EXECUTE</button>
      </div>
      
      <div ref={cursorRef} className="absolute left-6 top-20 z-20" style={{ transform: 'translate(0px, 0px)' }}>
        <MousePointer2 className="text-white drop-shadow-md" size={28} fill="black" />
      </div>
    </div>
  );
};

// --- COMPONENT: FEATURES WRAPPER ---
const Features = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        <DiagnosticShuffler />
        <TelemetryTypewriter />
        <CursorScheduler />
      </div>
    </section>
  );
};

// --- COMPONENT: PHILOSOPHY ---
const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="relative py-40 px-6 overflow-hidden bg-dark -mx-6 md:mx-0 md:rounded-[4rem]">
      <div className="max-w-5xl mx-auto relative z-10">
        <p className="phil-line text-xl md:text-2xl font-mono text-subtext mb-8">
          Most fitness treats fatherhood as: the obstacle in your way.
        </p>
        <p className="phil-line text-4xl md:text-7xl font-drama italic text-text leading-tight">
          We treat it as: <br/><span className="text-accent not-italic font-heading font-extrabold tracking-tight">The Mission</span>.
        </p>
      </div>
    </section>
  );
};

// --- COMPONENT: PROTOCOL (Sticky Stacking) ---
const ProtocolCard = ({ index, title, text, Graphic }) => {
  return (
    <div className="protocol-card min-h-screen flex items-center justify-center sticky top-0 px-6">
      <div className="w-full max-w-5xl bg-dark border border-white/5 p-12 md:p-20 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <div className="text-accent font-mono text-sm font-bold mb-6">STEP 0{index}</div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">{title}</h2>
          <p className="text-lg text-subtext font-mono leading-relaxed">{text}</p>
        </div>
        <div className="md:w-1/2 flex justify-center opacity-70">
          <Graphic />
        </div>
      </div>
    </div>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: cards[i + 1],
            end: "top top",
            pin: true,
            pinSpacing: false
          });
          
          gsap.to(card.querySelector('.bg-dark'), {
            scale: 0.9,
            opacity: 0.3,
            filter: 'blur(10px)',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="protocol" className="relative pb-24">
      <ProtocolCard 
        index={1} 
        title="The Squeeze" 
        text="18-minute sessions. Built for the guy with a baby on the floor and zero margin for fluff."
        Graphic={() => (
          <svg viewBox="0 0 100 100" className="w-48 h-48 animate-[spin_10s_linear_infinite]">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#D97706" strokeWidth="2" strokeDasharray="10 5" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="#1A4B8F" strokeWidth="4" />
          </svg>
        )}
      />
      <ProtocolCard 
        index={2} 
        title="Dad Score" 
        text="A holistic metric for the modern father. Track Body, Mind, and Spirit daily."
        Graphic={() => (
          <div className="w-full h-48 border border-white/10 rounded-xl relative overflow-hidden flex items-center bg-background">
            <div className="absolute top-0 bottom-0 w-1 bg-accent shadow-[0_0_15px_#D97706] animate-[translate_3s_ease-in-out_infinite_alternate]" style={{ animationName: 'scan' }} />
            <style>{`@keyframes scan { 0% { left: 0; } 100% { left: 100%; } }`}</style>
            <div className="w-full border-t border-dashed border-white/20" />
          </div>
        )}
      />
      <ProtocolCard 
        index={3} 
        title="The Brotherhood" 
        text="Our private accountability layer. For men who refuse to let responsibility make them weak."
        Graphic={() => (
          <Activity size={180} className="text-primary animate-pulse" strokeWidth={1} />
        )}
      />
    </section>
  );
};

// --- COMPONENT: BROTHERHOOD ---
const Brotherhood = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-dark/50 rounded-[4rem] border border-white/5 opacity-50 pointer-events-none" />
      <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">The<br/>Brotherhood.<span className="text-accent"></span></h2>
          <p className="text-lg font-mono text-subtext mb-8 max-w-md leading-relaxed">
            Accountability is the ultimate performance-enhancing drug. We are a private collective of fathers who refuse to let responsibility make us weak.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm font-bold"><CheckCircle2 size={16} className="text-accent" /> Live Leaderboards</div>
            <div className="flex items-center gap-3 text-sm font-bold"><CheckCircle2 size={16} className="text-accent" /> Direct Accountability Pairs</div>
            <div className="flex items-center gap-3 text-sm font-bold"><CheckCircle2 size={16} className="text-accent" /> Protocol Breakdowns</div>
          </div>
        </div>
        <div className="relative grid grid-cols-4 gap-4 opacity-80 pl-6 md:pl-0">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="aspect-square bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                 <MousePointer2 size={12} className="text-white/20" />
              </div>
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent flex items-end justify-center pb-8 border border-white/5 rounded-[2rem] backdrop-blur-sm">
             <div className="text-accent font-mono text-sm tracking-widest font-bold animate-pulse">24/7 ONLINE</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: BUILD LOG ---
const BuildLog = () => {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="bg-dark border border-white/10 rounded-[2rem] p-10 md:p-16 relative shadow-2xl">
        <div className="absolute top-0 right-10 w-px h-full bg-white/5" />
        <div className="absolute top-0 right-20 w-px h-full bg-white/5" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-accent bg-accent/10 w-fit px-3 py-1 rounded mb-8">
            <Cpu size={14} className="animate-pulse" /> TRANSPARENT LOGS
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Building a $1M/yr<br/>Autonomous Business.</h2>
          <p className="text-subtext font-mono text-base max-w-lg mb-10">
            We document everything. Scripts, code, failures, and financials — every week. Long-form transparency for men who want to see what the build actually costs.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
            <button className="bg-[#1A4B8F] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-between group hover:scale-[1.02] transition-transform">
              Watch the Logs <span>→</span>
            </button>
            <button className="bg-white/5 text-text border border-white/10 px-6 py-4 rounded-xl font-bold flex items-center justify-between hover:bg-white/10 transition-colors">
              Read the Briefs <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: PRICING ---
const Pricing = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold tracking-tight mb-6">Access the OS.</h2>
        <p className="font-mono text-subtext text-lg">One system. Zero fluff.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 items-center">
        {/* Tier 1 */}
        <div className="bg-dark/50 border border-white/10 rounded-[2rem] p-8">
          <h3 className="text-2xl font-bold mb-2">Free Forever</h3>
          <p className="font-mono text-subtext text-sm mb-6 pb-6 border-b border-white/10">The absolute basics.</p>
          <div className="text-4xl font-extrabold mb-8">$0</div>
          <ul className="space-y-4 font-mono text-sm mb-8 text-subtext">
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-accent" />1 Program</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-accent" />The Squeeze (Preview)</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-accent" />Dad Score Tracker</li>
          </ul>
        </div>
        
        {/* Tier 2 */}
        <div className="bg-accent text-dark border border-accent rounded-[2rem] p-10 transform md:scale-105 shadow-[0_0_50px_rgba(217,119,6,0.15)] relative z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark text-accent border border-accent px-4 py-1 rounded-full text-xs font-bold font-mono">
            LAUNCH OFFER
          </div>
          <h3 className="text-2xl font-bold mb-2">Founder's Pass</h3>
          <p className="font-mono text-dark/70 text-sm mb-6 pb-6 border-b border-dark/10">Lifetime access. Early adopters.</p>
          <div className="text-5xl font-extrabold mb-2">$47</div>
          <p className="font-mono text-xs text-dark/70 font-bold mb-8 items-center flex gap-2">
             ONE-TIME PAYMENT
          </p>
          <ul className="space-y-4 font-mono text-sm mb-8 font-semibold">
            <li className="flex items-center gap-3"><CheckCircle2 size={18} />Lifetime Dad Strong+</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={18} />Unlimited AI Sessions</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={18} />All 5 Programs</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={18} />Exclusive Founder Badge</li>
          </ul>
          <button className="w-full bg-dark text-white font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform">Claim Access</button>
        </div>
        
        {/* Tier 3 */}
        <div className="bg-dark/50 border border-white/10 rounded-[2rem] p-8">
          <h3 className="text-2xl font-bold mb-2">Dad Strong+</h3>
          <p className="font-mono text-subtext text-sm mb-6 pb-6 border-b border-white/10">The full operating system.</p>
          <div className="text-4xl font-extrabold mb-8">$9.99<span className="text-lg text-subtext">/mo</span></div>
          <ul className="space-y-4 font-mono text-sm mb-8 text-subtext">
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" />Unlimited Squeeze Logic</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" />AI Weekly Debriefs</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary" />Full Leaderboards</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: CTA / MEMBERSHIP ---
const CTA = () => {
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">Start<br/>Building.</h2>
      <p className="font-mono text-subtext mb-12 max-w-2xl mx-auto text-lg">
        Get the app for the heavy lifting. Join the brotherhood for the alignment.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
         <button className="bg-accent text-dark px-10 py-5 rounded-full font-bold text-lg hover:scale-[1.03] transition-transform duration-300 shadow-[0_0_30px_rgba(217,119,6,0.2)]">
            Download the App
         </button>
         <button className="bg-primary text-text px-10 py-5 rounded-full font-bold text-lg hover:scale-[1.03] transition-transform duration-300">
            Join the Skool
         </button>
      </div>
    </section>
  );
};

// --- COMPONENT: FOOTER ---
const Footer = () => {
  return (
    <footer className="bg-[#05080c] rounded-t-[4rem] pt-20 pb-10 px-10 mt-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <img src="/logo.svg" alt="Dad Strength" className="h-10 w-auto object-contain mb-6" />
          <p className="font-mono text-sm text-subtext max-w-xs mb-8">Functional strength without the alpha-bro posturing.</p>
          <div className="flex items-center gap-2 text-xs font-mono text-white/50">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> 
            SYSTEM OPERATIONAL
          </div>
        </div>
        
        <div className="flex gap-16">
          <div className="flex flex-col gap-4 text-sm font-semibold text-subtext">
            <a href="#" className="hover:text-text">The App</a>
            <a href="#" className="hover:text-text">Skool Community</a>
            <a href="#" className="hover:text-text">YouTube Logs</a>
          </div>
          <div className="flex flex-col gap-4 text-sm font-semibold text-subtext">
            <a href="#" className="hover:text-text">Terms</a>
            <a href="#" className="hover:text-text">Privacy</a>
            <a href="#" className="hover:text-text">Contact</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs font-mono text-white/30">
        © 2026 Dad Strength. All rights reserved.
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Brotherhood />
      <Pricing />
      <BuildLog />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
