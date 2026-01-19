"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import {
    ShieldCheck, Zap, Activity, Navigation, Wifi,
    MapPin, Brain, AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

export function InteractiveHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    // Mouse position mechanism
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    // Parallax transforms
    const x1 = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
    const y1 = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);
    const x2 = useTransform(mouseX, [-0.5, 0.5], [30, -30]);
    const y2 = useTransform(mouseY, [-0.5, 0.5], [30, -30]);
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                mouseX.set(0);
                mouseY.set(0);
            }}
            className="relative w-full max-w-4xl mx-auto h-[500px] perspective-1000 flex items-center justify-center cursor-crosshair overflow-visible z-20"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Main Floating HUD Container */}
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative w-[300px] md:w-[600px] h-[350px] md:h-[400px] transform-style-3d"
            >

                {/* Back Layer: Map Grid */}
                <motion.div
                    style={{ x: x1, y: y1, z: 20 }}
                    className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center"></div>

                    {/* Simulating Map Data Pulse */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-indigo-500/30 rounded-full animate-ping opacity-10"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-emerald-500/20 rounded-full animate-ping opacity-10 animation-delay-500"></div>
                </motion.div>

                {/* Middle Layer: Cards & Elements */}

                {/* 1. Emergency Status Card (Top Left) */}
                <motion.div
                    style={{ x: x2, y: y2, z: 60 }}
                    className="absolute top-8 left-8 bg-red-500/10 border border-red-500/30 p-4 rounded-xl backdrop-blur-md w-40"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] uppercase font-bold text-red-400">Status: Active</span>
                    </div>
                    <div className="text-white font-mono text-xs">Lat: 28.6139<br />Lng: 77.2090</div>
                </motion.div>

                {/* 2. Central Hero Element (Shield/Logo) */}
                <motion.div
                    style={{ z: 100 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <div className="relative w-32 h-32 bg-slate-950 rounded-3xl border-4 border-slate-800 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.3)]">
                        <ShieldCheck className="w-16 h-16 text-indigo-500 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                        {/* Orbital Ring */}
                        <svg className="absolute inset-0 -m-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] animate-[spin_10s_linear_infinite]">
                            <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="20 80" />
                        </svg>
                    </div>
                </motion.div>

                {/* 3. AI Analysis Card (Bottom Right) */}
                <motion.div
                    style={{ x: x2, y: y2, z: 80 }}
                    className="absolute bottom-8 right-8 bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-xl backdrop-blur-md w-48 text-right"
                >
                    <div className="flex items-center justify-end gap-2 mb-2">
                        <span className="text-[10px] uppercase font-bold text-indigo-400">AI Analysis</span>
                        <Brain className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="space-y-1">
                        <div className="h-1 bg-slate-700 rounded-full overflow-hidden w-full">
                            <div className="h-full bg-indigo-500 w-[85%]"></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                            <span>Vitals</span>
                            <span>98%</span>
                        </div>
                    </div>
                </motion.div>

                {/* Foreground Layer: HUD Overlay */}
                <div className="absolute inset-0 pointer-events-none z-50">
                    {/* Corner Reticles */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>

                    {/* Center Crosshair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                </div>

            </motion.div>
        </div>
    );
}
