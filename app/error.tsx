"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, RefreshCw, Radio, Terminal } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the server error to console
    console.error("Database Link Failure:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Neon Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-warning/5 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '-2s' }} />

      {/* Main Error Dashboard Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-full max-w-lg rounded-2xl glass-panel bg-card-bg/40 p-8 border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.1)] relative z-10 flex flex-col items-center text-center"
      >
        {/* Glowing Warning Shield Icon */}
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/35 flex items-center justify-center mb-6 relative">
          <AlertOctagon className="text-red-500 animate-pulse" size={32} />
          <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-md -z-10 animate-ping" style={{ animationDuration: '3s' }} />
        </div>

        <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase mb-2">ACADEMIC_DATABASE_LINK_LOST</span>
        <h1 className="text-xl font-black text-foreground font-mono tracking-tight uppercase mb-3">
          Database Link Failure
        </h1>
        
        <p className="text-foreground-muted text-xs max-w-sm leading-relaxed mb-6">
          The connection to your Supabase PostgreSQL cluster was interrupted or refused. Database could not be synced.
        </p>

        {/* Technical Error Code Box */}
        <div className="w-full bg-background/80 border border-border rounded-xl p-4 text-left font-mono text-[10px] text-foreground-faint flex flex-col gap-1.5 mb-8">
          <div className="flex items-center gap-1.5 text-red-400 font-bold">
            <Terminal size={12} /> ERROR PROTOCOL:
          </div>
          <div className="overflow-x-auto whitespace-pre-wrap py-1 text-foreground-muted">
            {error.message || 'Unknown network cluster sync error. Connection refused by server.'}
          </div>
          <div className="text-slate-600 border-t border-border pt-1.5 mt-1.5">
            DIGEST ID: {error.digest || 'ERR_SYN_FAILED_091x'}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-red-500 text-foreground font-mono text-xs font-bold shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:bg-red-600 transition-all duration-300 border border-red-400/20 active:scale-95"
          >
            <RefreshCw size={14} className="animate-spin" style={{ animationDuration: '3s' }} />
            RE-ENGAGE DATABASE LINK
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              // Simply reload to trigger static seed data fallback
              window.location.reload();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-background border border-border-highlight hover:border-border-highlight text-foreground-muted hover:text-foreground font-mono text-xs font-bold transition-all duration-300 active:scale-95"
          >
            <Radio size={14} className="text-primary" />
            LAUNCH OFFLINE SANDBOX
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
