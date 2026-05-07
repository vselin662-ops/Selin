import { useState, useEffect } from 'react';
import { 
  ScanEye, 
  Layers, 
  Wind, 
  Zap, 
  Terminal, 
  TrendingUp, 
  ShieldCheck,
  Sun,
  Moon,
  ZapIcon
} from 'lucide-react';
import { motion } from 'motion/react';

type Theme = 'neon' | 'dark' | 'light';

export default function App() {
  const [gas, setGas] = useState(14);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState<Theme>('neon');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const gasInterval = setInterval(() => {
      setGas(prev => Math.max(8, Math.min(40, prev + (Math.random() * 4 - 2))));
    }, 3000);

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(gasInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const cycleTheme = () => {
    const themes: Theme[] = ['neon', 'dark', 'light'];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 flex flex-col relative overflow-y-auto max-w-2xl mx-auto selection:bg-accent/30 selection:text-accent">
      
      {/* Top Status Bar */}
      <div className="flex justify-between items-center mb-8 text-[9px] tracking-[0.2em] text-accent font-bold uppercase">
        <div className="flex gap-4 md:gap-6 items-center">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 bg-accent rounded-full animate-pulse shadow-[0_0_5px_var(--color-accent)]"></span>
            Core: v2.0.4
          </span>
          <span className="hidden sm:inline opacity-50">Region: Global/Secure</span>
          <span className="opacity-70">{currentTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>
        
        {/* Theme Switcher */}
        <div className="flex gap-4 items-center">
          <button 
            onClick={cycleTheme}
            className="flex items-center gap-2 px-2 py-1 border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer group"
          >
            {theme === 'neon' && <ZapIcon size={10} className="text-accent" />}
            {theme === 'dark' && <Moon size={10} className="text-accent" />}
            {theme === 'light' && <Sun size={10} className="text-accent" />}
            <span className="text-[8px]">{theme}</span>
          </button>
          <div className="flex gap-3 opacity-40">
            <span className="flex items-center gap-1">
              <ShieldCheck size={10} />
              AES-256
            </span>
          </div>
        </div>
      </div>

      {/* Header: Logo + Title */}
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute inset-0 logo-ring rounded-full"></div>
            <div className="absolute inset-1 border border-accent opacity-10 rounded-full"></div>
            <div className="relative w-11 h-11 rounded-full border-2 border-accent overflow-hidden shadow-[0_0_20px_var(--color-accent)] bg-black">
              <img 
                src="./logo.png" 
                className="w-full h-full object-cover"
                alt="Selin Logo"
              />
            </div>
          </div>
          <div>
            <h1 className="font-display text-3xl tracking-[0.18em] text-text glitch leading-none select-none">
              SELIN
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-[2px] w-12 bg-accent shadow-[0_0_8px_var(--color-accent)]"></div>
              <span className="text-[8px] text-accent opacity-80 font-black tracking-[0.3em] uppercase">Genius HUD</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-[9px] opacity-60 uppercase font-bold tracking-widest mb-1">Network Gas</p>
          <div className="flex items-baseline justify-end gap-1">
            <span className="font-display text-xl text-text">{gas.toFixed(0)}</span>
            <span className="text-[10px] text-accent font-bold uppercase">gw</span>
          </div>
        </div>
      </header>

      <motion.main 
        key={theme}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6"
      >
        <section className="hud-border bg-accent/5 p-5 rounded-sm flex items-center justify-between border-l-4 border-l-accent overflow-hidden">
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 border border-accent/20 flex items-center justify-center relative flex-shrink-0">
              <div className="absolute inset-0 animate-pulse bg-accent/5"></div>
              <ScanEye className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-[10px] opacity-50 font-bold uppercase tracking-widest">Quantum Security</p>
              <p className="text-[11px] text-text font-mono flex items-center gap-2">
                Status: <span className="text-accent animate-pulse">Deep Scan Active</span>
              </p>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-text/10 mx-4 hidden xs:block"></div>
          <div className="text-right font-display text-xl flex-shrink-0">
            0.02<span className="text-[10px] opacity-40 ml-1 font-sans">MS</span>
          </div>
        </section>

        <section className="p-8 bg-gradient-to-b from-text/5 to-transparent border-t border-text/5 text-center relative overflow-hidden group rounded-xl">
          <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
          <p className="text-[9px] opacity-50 uppercase tracking-[0.4em] mb-4 font-bold relative z-10">Total Portfolio Assets</p>
          <div className="flex justify-center items-baseline gap-1 relative z-10">
            <span className="text-3xl font-light text-accent">$</span>
            <h2 className="text-5xl md:text-6xl font-display tracking-tighter text-text">142,000</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-[10px] font-mono relative z-10 uppercase">
            <span className="text-accent bg-accent/10 px-3 py-1 border border-accent/20">BTC: 0.042</span>
            <span className="text-purple-500 bg-purple-500/10 px-3 py-1 border border-purple-500/20">TON: 840.1</span>
            <span className="text-emerald-500 bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">SOL: 12.5</span>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { label: 'DeFi Matrix', icon: Layers, color: 'text-accent', desc: 'Protocol Analysis' },
            { label: 'Stealth Bridge', icon: Wind, color: 'text-text/40', desc: 'Secure Relay' },
            { label: 'Neural Stake', icon: Zap, color: 'text-yellow-400', desc: 'Auto Yield' },
            { label: 'Admin Terminal', icon: Terminal, color: 'text-emerald-500', desc: 'Root Access' }
          ].map((btn, i) => (
            <button 
              key={i} 
              className="hud-border bg-text/2 p-5 text-left group active:bg-accent/10 transition-all border-text/5 hover:border-accent/20 hover:bg-text/4 cursor-pointer"
            >
              <btn.icon size={20} className={`${btn.color} mb-3 group-hover:scale-110 transition-transform group-hover:drop-shadow-[0_0_8px_currentColor]`} />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-text/90">{btn.label}</p>
                <p className="text-[8px] opacity-40 mt-0.5 uppercase tracking-tighter">{btn.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.main>

      <nav className="mt-auto flex justify-between items-center text-[10px] font-bold opacity-40 tracking-widest uppercase py-6 border-t border-text/5 bg-bg/50 backdrop-blur-sm -mx-4 px-8 sticky bottom-0 z-50">
        <button className="text-accent border-b-2 border-accent pb-1 cursor-pointer">OVERVIEW</button>
        <button className="hover:text-text transition-colors cursor-pointer">DECRYPT</button>
        <button className="hover:text-text transition-colors cursor-pointer">ASSETS</button>
        <button className="hover:text-text transition-colors cursor-pointer">NODES</button>
      </nav>

      {theme === 'neon' && (
        <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-[1000] bg-[length:100%_4px,3px_100%]"></div>
      )}
    </div>
  );
}
