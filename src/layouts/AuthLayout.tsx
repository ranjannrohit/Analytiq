import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-primary flex">
      {/* Left - Brand Panel */}
      <div className="hidden lg:flex w-[480px] flex-col relative overflow-hidden bg-surface-950">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-auto">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="10" width="4" height="8" rx="1" fill="white" fillOpacity="0.9" />
                <rect x="8" y="6"  width="4" height="12" rx="1" fill="white" />
                <rect x="14" y="2" width="4" height="16" rx="1" fill="white" fillOpacity="0.7" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Analytiq</span>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                Run your business<br />on autopilot.
              </h1>
              <p className="text-surface-400 text-lg leading-relaxed">
                AI-powered analytics, automated workflows, and real-time insights — all in one place.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[['2,400+','Businesses'],['₹48Cr','Processed'],['99.9%','Uptime']].map(([val, label]) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="text-white font-bold text-xl">{val}</div>
                  <div className="text-surface-500 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-surface-300 text-sm leading-relaxed italic">
                "Analytiq replaced 3 tools we were using. Our fee collection rate went from 67% to 94% in 2 months."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white text-xs font-bold">PM</div>
                <div>
                  <div className="text-white text-sm font-medium">Prateek Mehta</div>
                  <div className="text-surface-500 text-xs">Director, TechSkills Academy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="10" width="4" height="8" rx="1" fill="white" fillOpacity="0.9" />
                <rect x="8" y="6"  width="4" height="12" rx="1" fill="white" />
                <rect x="14" y="2" width="4" height="16" rx="1" fill="white" fillOpacity="0.7" />
              </svg>
            </div>
            <span className="font-bold text-lg text-primary">Analytiq</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
