"use client";

import { motion } from "framer-motion";
import { AlertCircle, MapPin, Radio, HeartPulse, CheckCircle2, Navigation, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

// Duplicate steps to ensure seamless infinite scroll
const ITEMS = [
    { label: "Emergency Detected", icon: AlertCircle, color: "text-red-500" },
    { label: "Analysing Vitals", icon: HeartPulse, color: "text-rose-500" },
    { label: "Location Locked", icon: MapPin, color: "text-amber-500" },
    { label: "Nearest ER Found", icon: Navigation, color: "text-orange-500" },
    { label: "Route Optimized", icon: Zap, color: "text-yellow-500" },
    { label: "Dispatch Sent", icon: Radio, color: "text-indigo-500" },
    { label: "Family Notified", icon: Shield, color: "text-blue-500" },
    { label: "Arrival Confirmed", icon: CheckCircle2, color: "text-emerald-500" },
];

export function AnimatedWorkflow() {
    return (
        <div className="w-full max-w-4xl mx-auto mt-12 mb-8 relative overflow-hidden mask-linear-fade">

            {/* Container with fade masks at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

            <div className="flex select-none">
                {/* We need two sets of items for the infinite loop effect */}
                <MarqueeGroup />
                <MarqueeGroup />
            </div>

        </div>
    );
}

function MarqueeGroup() {
    return (
        <motion.div
            className="flex gap-12 items-center flex-shrink-0 px-6"
            animate={{ x: "-100%" }}
            transition={{
                duration: 30, // Slow, smooth speed
                repeat: Infinity,
                ease: "linear",
            }}
        >
            {ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                    <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm",
                        "bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900"
                    )}>
                        <item.icon className={cn("w-4 h-4", item.color)} />
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap tracking-wide">
                        {item.label}
                    </span>
                    {/* Connector DOT */}
                    <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 ml-9"></div>
                </div>
            ))}
        </motion.div>
    );
}
