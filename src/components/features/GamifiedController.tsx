"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Zap, MapPin, Brain, ShieldCheck, Activity,
    ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
    Power, Crosshair, BarChart3, Radio
} from "lucide-react";
import { cn } from "@/lib/utils";

// Feature Data
const FEATURES = [
    {
        id: "emergency",
        title: "Emergency Mode",
        icon: Zap,
        color: "from-red-500 to-orange-500",
        stats: ["Latency: <50ms", "GPS: Active", "Protocol: SOS"],
        description: "One-tap activation of critical survival protocols. Instantly shares live location with first responders and guides you through lifesaving steps."
    },
    {
        id: "tracker",
        title: "Seat Tracker",
        icon: MapPin,
        color: "from-blue-500 to-cyan-500",
        stats: ["Radius: 5km", "Update: Live", "Accuracy: 98%"],
        description: "Real-time hospital bed availability and queue tracking. Don't guess where to go—know exactly which facility has space for you right now."
    },
    {
        id: "ai",
        title: "AI Guidance",
        icon: Brain,
        color: "from-purple-500 to-indigo-500",
        stats: ["Model: Med-v2", "Offline: Yes", "Voice: Active"],
        description: "Not just a chatbot. A medical-grade decision engine that helps you triage symptoms and perform first aid even without internet access."
    },
    {
        id: "vault",
        title: "Health Vault",
        icon: ShieldCheck,
        color: "from-emerald-500 to-teal-500",
        stats: ["Encrypted: AES-256", "Local: Yes", "Sync: Auto"],
        description: "Your complete medical history, accessible in milliseconds. Securely stores allergies, blood type, and insurance data for instant emergency access."
    }
];

export function GamifiedController() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeFeature = FEATURES[activeIndex];

    const nextFeature = () => setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    const prevFeature = () => setActiveIndex((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);

    return (
        <div className="w-full max-w-5xl mx-auto p-2 md:p-8 perspective-1000">
            <div className="relative bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border-4 border-slate-800 shadow-2xl overflow-hidden min-h-[600px] flex flex-col md:flex-row gap-8 md:gap-12 items-center">

                {/* Background Ambient Glow */}
                <div className={cn(
                    "absolute inset-0 opacity-20 transition-colors duration-700 bg-gradient-to-br blur-3xl",
                    activeFeature.color
                )}></div>

                {/* Scanlines Overlay */}
                <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>

                {/* LEFT: The Controller Interface */}
                <div className="relative z-10 flex-1 flex flex-col items-center">

                    <div className="relative w-72 h-72 md:w-80 md:h-80 bg-slate-950 rounded-full border-8 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center ring-4 ring-slate-900/50">
                        {/* Central "Screen" inside the dial */}
                        <div className="absolute inset-4 rounded-full bg-slate-900 overflow-hidden flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFeature.id}
                                    initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                                    transition={{ type: "spring", bounce: 0.5 }}
                                >
                                    <activeFeature.icon className={cn("w-24 h-24 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-white")} />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* D-Pad / Control Buttons */}
                        {/* Top Button */}
                        <button
                            onClick={prevFeature}
                            className="absolute -top-6 w-16 h-12 bg-slate-800 rounded-lg border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center hover:bg-slate-700 group hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                        >
                            <ChevronUp className="text-slate-400 group-hover:text-white" />
                        </button>

                        {/* Bottom Button */}
                        <button
                            onClick={nextFeature}
                            className="absolute -bottom-6 w-16 h-12 bg-slate-800 rounded-lg border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center hover:bg-slate-700 group hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                        >
                            <ChevronDown className="text-slate-400 group-hover:text-white" />
                        </button>

                        {/* Orbital Ring Logic (Decorative) */}
                        <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-30 pointer-events-none">
                            <circle cx="50%" cy="50%" r="48%" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" className="text-slate-500" />
                        </svg>
                        <svg className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite_reverse] opacity-20 pointer-events-none">
                            <circle cx="50%" cy="50%" r="40%" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="40 60" className="text-white" />
                        </svg>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                            <span className="text-[10px] uppercase font-mono text-slate-500">System Online</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Radio className="w-3 h-3 text-slate-500" />
                            <span className="text-[10px] uppercase font-mono text-slate-500">Connected</span>
                        </div>
                    </div>

                </div>

                {/* RIGHT: The Info Display (CRT Style) */}
                <div className="flex-[1.5] bg-slate-950/50 rounded-2xl border border-slate-800 p-6 relative overflow-hidden backdrop-blur-md">
                    {/* CRT Scanline Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-3">
                                <Crosshair className="w-5 h-5 text-indigo-500 animate-[spin_3s_linear_infinite]" />
                                <span className="font-mono text-indigo-400 text-sm tracking-widest">MODULE_0{activeIndex + 1}</span>
                            </div>
                            <BarChart3 className="w-5 h-5 text-slate-600" />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFeature.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className={cn("text-2xl md:text-5xl font-display font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r", activeFeature.color)}>
                                    {activeFeature.title}
                                </h3>

                                <p className="text-sm md:text-xl text-slate-300 leading-relaxed mb-6 md:mb-8">
                                    {activeFeature.description}
                                </p>

                                <div className="grid grid-cols-3 gap-4">
                                    {activeFeature.stats.map((stat, i) => (
                                        <div key={i} className="bg-slate-900/80 border border-slate-700/50 p-1 rounded-lg">
                                            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Param_0{i + 1}</div>
                                            <div className="font-mono text-[8px] text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]">{stat}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        
                    </div>
                </div>

            </div>
        </div>
    );
}
