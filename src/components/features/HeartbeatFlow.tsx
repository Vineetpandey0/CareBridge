"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
    Activity, Zap, Brain, MapPin, Server,
    Settings, Power, Radio, Crosshair
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
    { id: "vitals", label: "VITALS_MONITOR", icon: Activity, val: "98 BPM" },
    { id: "triage", label: "AI_TRIAGE_CORE", icon: Brain, val: "ANALYZING" },
    { id: "locate", label: "GPS_LOCATOR", icon: MapPin, val: "3.2 KM" },
    { id: "uplink", label: "CLOUD_UPLINK", icon: Server, val: "SECURE" },
];

export function HeartbeatFlow() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="w-full max-w-6xl mx-auto py-24 px-4 bg-slate-950 font-mono text-emerald-500 select-none">
            {/* Monitor Frame */}
            <div className="relative border-[12px] border-slate-900 rounded-3xl bg-black shadow-2xl overflow-hidden aspect-video md:aspect-[21/9]">

                {/* Screen Content */}
                <div className="absolute inset-0 bg-slate-950 opacity-90">
                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                    {/* Scanline */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent animate-scan pointer-events-none"></div>

                    {/* Top Status Bar */}
                    <div className="flex justify-between items-center p-6 border-b border-emerald-900/30 text-xs tracking-widest text-emerald-600">
                        <div className="flex gap-4">
                            <span>REC_MODE: ACTIVE</span>
                            <span>SYS_UPTIME: 99.99%</span>
                        </div>
                        <div className="flex gap-2 items-center text-emerald-500 animate-pulse">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            LIVE FEED
                        </div>
                    </div>

                    {/* Main ECG Display Area */}
                    <div className="relative h-2/3 flex items-center justify-center overflow-hidden">
                        {/* The "Heartbeat" Line - simplified SVG path simulation */}
                        <svg className="absolute w-full h-40 stroke-emerald-500 fill-none stroke-2 opacity-50" preserveAspectRatio="none">
                            <path d="M0,80 L200,80 L210,50 L220,110 L230,20 L240,140 L250,80 L400,80 L410,50 L420,110 L430,20 L440,140 L450,80 L1200,80"
                                className="animate-ecg-scroll"
                                strokeDasharray="1000"
                                strokeDashoffset="1000"
                            />
                        </svg>

                        {/* Central Focus Node */}
                        <div className="z-10 text-center relative">
                            <div className="w-32 h-32 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 bg-emerald-900/20 shadow-[0_0_50px_rgba(16,185,129,0.2)] animate-pulse-slow relative">
                                {/* Reticle Sprites */}
                                <Crosshair className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 text-emerald-500/50" />
                                <Crosshair className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 text-emerald-500/50" />
                                <Crosshair className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/50" />
                                <Crosshair className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/50" />

                                {/* Active Icon */}
                                {(() => {
                                    const Icon = STEPS[activeStep].icon;
                                    return <Icon className="w-12 h-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />;
                                })()}
                            </div>

                            <h3 className="text-2xl font-bold text-white tracking-tighter mb-1">{STEPS[activeStep].label}</h3>
                            <div className="text-4xl font-bold text-emerald-400">{STEPS[activeStep].val}</div>
                        </div>

                        {/* Left/Right Arrows for Interaction */}
                        <button
                            onClick={() => setActiveStep((prev) => (prev - 1 + STEPS.length) % STEPS.length)}
                            className="absolute left-10 p-4 hover:bg-emerald-900/20 rounded-full transition-colors group"
                        >
                            <div className="w-0 h-0 border-y-8 border-y-transparent border-r-[12px] border-r-emerald-700 group-hover:border-r-emerald-500"></div>
                        </button>
                        <button
                            onClick={() => setActiveStep((prev) => (prev + 1) % STEPS.length)}
                            className="absolute right-10 p-4 hover:bg-emerald-900/20 rounded-full transition-colors group"
                        >
                            <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[12px] border-l-emerald-700 group-hover:border-l-emerald-500"></div>
                        </button>
                    </div>

                    {/* Bottom Control Knobs */}
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-slate-900/80 border-t border-emerald-900/50 flex items-center justify-around px-12">
                        {STEPS.map((step, i) => {
                            const isActive = i === activeStep;
                            return (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveStep(i)}
                                    className="flex flex-col items-center gap-3 group"
                                >
                                    <div className={cn(
                                        "w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 shadow-xl",
                                        isActive
                                            ? "border-emerald-500 bg-emerald-900/20 shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-110"
                                            : "border-slate-700 bg-slate-800 group-hover:border-emerald-700"
                                    )}>
                                        <step.icon className={cn("w-6 h-6", isActive ? "text-white" : "text-slate-500")} />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className={cn("text-[10px] font-bold tracking-widest uppercase mb-1", isActive ? "text-emerald-400" : "text-slate-600")}>
                                            {step.id}
                                        </span>
                                        <div className={cn("w-full h-1 rounded-full", isActive ? "bg-emerald-500" : "bg-slate-800")}></div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                </div>
            </div>

            {/* Decorative External Knobs */}
            <div className="flex justify-center gap-8 mt-6 opacity-40">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full border-2 border-slate-700 flex items-center justify-center transform hover:rotate-45 transition-transform cursor-pointer">
                        <Power className="w-5 h-5 text-slate-500" />
                    </div>
                    <span className="text-[10px] uppercase">Power</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full border-2 border-slate-700 flex items-center justify-center transform hover:-rotate-45 transition-transform cursor-pointer">
                        <Radio className="w-5 h-5 text-slate-500" />
                    </div>
                    <span className="text-[10px] uppercase">Tune</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full border-2 border-slate-700 flex items-center justify-center transform hover:rotate-180 transition-transform cursor-pointer">
                        <Settings className="w-5 h-5 text-slate-500" />
                    </div>
                    <span className="text-[10px] uppercase">Calibrate</span>
                </div>
            </div>
        </div>
    );
}
