"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, Server, Activity, Users, Zap,
    ChevronUp, ChevronDown, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Layer Data
const LAYERS = [
    {
        id: "cloud",
        level: 3,
        title: "Roof: The Cloud",
        subtitle: "Data & Sync Layer",
        icon: Server,
        color: "bg-indigo-500",
        text: "text-indigo-400",
        description: "Encrypted health records synced instantly across devices. AI models update in real-time.",
        stats: ["AES-256", "99.9% Uptime"]
    },
    {
        id: "wards",
        level: 2,
        title: "Level 2: Care Units",
        subtitle: "Real-time Availability",
        icon: Users,
        color: "bg-blue-500",
        text: "text-blue-400",
        description: "Live tracking of hospital beds, oxygen availability, and specialist schedules.",
        stats: ["+45 Beds", "12min Wait"]
    },
    {
        id: "triage",
        level: 1,
        title: "Level 1: AI Triage",
        subtitle: "Intelligence Processing",
        icon: Activity,
        color: "bg-purple-500",
        text: "text-purple-400",
        description: "Incoming signals analyzed. Symptoms matched against medical protocols in milliseconds.",
        stats: ["<50ms Latency", "98% Acc."]
    },
    {
        id: "ground",
        level: 0,
        title: "Ground: Emergency",
        subtitle: "Physical Access",
        icon: Zap,
        color: "bg-emerald-500",
        text: "text-emerald-400",
        description: "The entry point. SOS triggers, ambulance routing, and fast-track admission codes.",
        stats: ["GPS Active", "Priority 1"]
    }
];

export function ArchitecturalFlow() {
    const [activeLevel, setActiveLevel] = useState(2); // Default to one of the middle layers
    const activeLayer = LAYERS.find(l => l.level === activeLevel) || LAYERS[0];

    return (
        <div className="w-full max-w-7xl mx-auto py-24 px-4">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono mb-4">
                    <Building2 className="w-3 h-3" /> SYSTEM_ARCH_V3.0
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">The Care Stack</h2>
                <p className="text-slate-400 max-w-xl mx-auto">Select a floor to inspect the digital infrastructure.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-center h-[600px]">

                {/* Left: Building Visualization (3D Stack) */}
                <div className="lg:col-span-8 h-full relative perspective-[2000px] flex items-center justify-center">
                    {/* The Container for 3D Transforms */}
                    <div className="relative w-80 md:w-96 h-96 transform-style-3d rotate-x-[60deg] rotate-z-[-45deg] transition-transform duration-700">

                        {LAYERS.map((layer, index) => {
                            const isActive = activeLevel === layer.level;
                            // Calculate spacing
                            // Standard spacing is 60px
                            // If this is the active layer, it pops up
                            // Layers above the active one shift up further
                            let zOffset = index * 60;
                            if (isActive) zOffset += 30; // Pop active slightly
                            if (layer.level > activeLevel) zOffset += 100; // Big gap for layers above active to reveal it

                            return (
                                <motion.div
                                    key={layer.id}
                                    animate={{
                                        z: zOffset,
                                        scale: isActive ? 1.05 : 1,
                                        opacity: isActive ? 1 : 0.4
                                    }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    onClick={() => setActiveLevel(layer.level)}
                                    className={cn(
                                        "absolute inset-0 border-2 transition-colors duration-300 cursor-pointer shadow-2xl",
                                        isActive
                                            ? `bg-slate-900/90 border-white/50 shadow-[0_0_50px_rgba(99,102,241,0.2)]`
                                            : "bg-slate-900/40 border-white/10 hover:bg-slate-900/60"
                                    )}
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        // Note: transform is handled by animate prop's 'z' which maps to translateZ in framer-motion 3D packages usually, 
                                        // but standard web animate needs clearer directive. 
                                        // Framer Motion 'z' is translateZ.
                                    }}
                                >
                                    {/* Glass Sheen */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

                                    {/* Layer Content (Flattened on surface) */}
                                    <div className="absolute inset-0 flex items-center justify-center transform -rotate-z-[135deg] -rotate-x-[-60deg]">
                                        <layer.icon className={cn("w-16 h-16 opacity-50", layer.text)} />
                                    </div>

                                    {/* Side Borders for 3D feel */}
                                    <div className={cn("absolute top-0 right-0 w-full h-8 origin-bottom -rotate-x-90 bg-white/5", isActive ? "bg-white/10" : "")}></div>
                                    <div className={cn("absolute bottom-0 right-0 w-8 h-full origin-left rotate-y-90 bg-white/5", isActive ? "bg-white/10" : "")}></div>

                                    {/* Active Indicator Ring */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeRing"
                                            className={cn("absolute inset-[-20px] border-2 border-dashed rounded-xl", layer.text.replace('text-', 'border-'))}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </motion.div>
                            );
                        })}

                        {/* Central Core Line */}
                        <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-indigo-500/50 rounded-full blur-xl transform translate-z-[200px]"></div>
                    </div>

                    {/* Floor Labels Floating */}
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 space-y-12 pointer-events-none hidden md:block opacity-30">
                        {LAYERS.map(l => (
                            <div key={l.id} className="text-right text-xs font-mono">{l.id.toUpperCase()}</div>
                        ))}
                    </div>
                </div>

                {/* Right: The "Elevator Panel" Controller */}
                <div className="lg:col-span-4 flex flex-col justify-center">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                        {/* Background Scanline */}
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.5)] animate-scan"></div>

                        <div className="relative z-10">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Level Selector</h3>

                            {/* Vertical Button Stack */}
                            <div className="space-y-3 mb-8">
                                {[...LAYERS].reverse().map((layer) => {
                                    const isActive = activeLevel === layer.level;
                                    return (
                                        <button
                                            key={layer.id}
                                            onClick={() => setActiveLevel(layer.level)}
                                            className={cn(
                                                "w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 group",
                                                isActive
                                                    ? "bg-white/5 border-white/20 shadow-lg scale-105"
                                                    : "bg-transparent border-white/5 hover:bg-white/5 hover:border-white/10"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-colors", isActive ? layer.color : "bg-slate-800 text-slate-500")}>
                                                    <span className="font-mono font-bold text-xs">{layer.level}</span>
                                                </div>
                                                <div className="text-left">
                                                    <div className={cn("font-bold text-sm", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-300")}>{layer.title}</div>
                                                </div>
                                            </div>
                                            {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Active Layer Details "Info LCD" */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeLevel}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-slate-950 rounded-xl p-4 border border-slate-800"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <activeLayer.icon className={cn("w-4 h-4", activeLayer.text)} />
                                        <span className={cn("text-xs font-bold uppercase", activeLayer.text)}>{activeLayer.subtitle}</span>
                                    </div>
                                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                                        {activeLayer.description}
                                    </p>
                                    <div className="flex gap-2">
                                        {activeLayer.stats.map(stat => (
                                            <span key={stat} className="text-[10px] bg-white/5 px-2 py-1 rounded text-white/70 border border-white/5">
                                                {stat}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
