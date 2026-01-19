"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck, Clock, MapPin, HeartPulse, ChevronRight,
  Smartphone, Zap, Activity, Navigation, ArrowRight,
  TrendingUp, Download, CheckCircle2, AlertTriangle, AlertCircle,
  Timer, Check, X, MoveRight,
  Pill, Stethoscope, Smile, CalendarHeart, Utensils, Droplet, Users, FileText, User, GlassWater,
  MousePointer2, Brain, Search, Sparkles,
  Shield,
  Database,
  WifiOff,
  Server,
  Radio,
  Ambulance
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";
import ReactFlow, { Background, Controls, Handle, Position } from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Lottie from "lottie-react";
import { GamifiedController } from "@/components/features/GamifiedController";

import { InteractiveHero } from "@/components/features/InteractiveHero";
import { AnimatedWorkflow } from "@/components/features/AnimatedWorkflow";

// Placeholder for Lottie animation (would import real JSON in prod)
// Using a simple CSS placeholder for now if JSON missing
const PulseAnimation = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping opacity-20"></div>
    <div className="relative z-10 p-6 bg-white dark:bg-slate-800 rounded-full shadow-2xl border-4 border-white dark:border-slate-700">
      <ShieldCheck className="w-16 h-16 text-blue-600" />
    </div>
  </div>
);

export default function LandingPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute inset-0 overflow-hidden pointers-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            <motion.div variants={fadeIn} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider">Emergency Response System</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white mb-6"
            >
              Golden Hour. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Platinum 10.</span> Act faster.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed"
            >
              CareBridge helps you take the right steps <span className="text-slate-900 dark:text-slate-100 font-medium">before it’s too late.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
            >
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 shadow-xl transition-all hover:scale-105 min-w-[200px]">
                <Download className="w-5 h-5 mr-2" /> Download CareBridge
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all min-w-[200px]" onClick={() => document.getElementById('problem-section')?.scrollIntoView({ behavior: 'smooth' })}>
                See Time Saved <TrendingUp className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-full"
            >
              <AnimatedWorkflow />
            </motion.div>
          </div>


        </div>
      </section>

      {/* Problem Section (Golden Hour + Platinum 10) - REDESIGNED */}
      <section id="problem" className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] -ml-20 -mb-20"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">

          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 border-b border-slate-800 pb-8">
            <div className="max-w-4xl">
              <Badge variant="outline" className="mb-8 text-xl px-8 py-4 shadow-[0_0_30px_rgba(220,38,38,0.6)] border-red-500 text-red-500 font-mono tracking-widest uppercase animate-pulse border-2">The Problem</Badge>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Time is not just money. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">It is survival.</span>
              </h2>

            </div>
            <div className="text-right hidden md:block">
              <div className="inline-flex flex-col items-end">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Impact Factor</span>
                <span className="text-5xl font-mono font-bold text-white tracking-tighter">100<span className="text-emerald-500">%</span></span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* Card A: Golden Hour - Deconstructed Design */}
            <div className="relative group">
              {/* "Broken" Border styling */}
              <div className="absolute -top-1 -left-1 w-12 h-12 border-t-2 border-l-2 border-amber-500 rounded-tl-lg z-20"></div>
              <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-2 border-r-2 border-amber-500 rounded-br-lg z-20"></div>

              <div className="relative bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 md:p-10 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                  <Clock className="w-24 h-24 text-slate-800/50 -rotate-12" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-2 hover:bg-amber-500/20">PHASE 1</Badge>
                      <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Golden Hour</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-mono font-bold text-amber-500">60</div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500">MINUTES</div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-lg leading-relaxed mb-8 border-l-2 border-amber-500/30 pl-6">
                    During the first hour, early medical support can significantly reduce irreversible damage.
                    This window is critical for conditions like <span className="text-white font-bold decoration-amber-500/50 underline underline-offset-4">heart attack, stroke, severe trauma, and major bleeding</span>.
                  </p>

                  <div className="grid gap-4">
                    {[
                      "Faster hospital arrival improves survival and long-term recovery.",
                      "Early treatment helps prevent complications like organ damage and shock.",
                      "Best time for correct triage: what to do + where to go."
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-slate-950/50 border border-slate-800/50 hover:border-amber-500/30 transition-colors">
                        <div className="min-w-[6px] h-[6px] rounded-full bg-amber-500 mt-2 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                        <p className="text-sm text-slate-400">{text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-500 text-xs font-bold tracking-widest uppercase">
                      <Activity className="w-4 h-4" /> Priority: Critical
                    </div>
                    <div className="text-slate-600 font-mono text-xs">ID: GLDN-HR</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card B: Platinum 10 - Deconstructed Design (Offset) */}
            <div className="relative group lg:mt-24">
              {/* "Broken" Border styling - Opposite corners */}
              <div className="absolute -top-1 -right-1 w-12 h-12 border-t-2 border-r-2 border-blue-500 rounded-tr-lg z-20"></div>
              <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-2 border-l-2 border-blue-500 rounded-bl-lg z-20"></div>

              <div className="relative bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 md:p-10 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                  <Zap className="w-24 h-24 text-slate-800/50 rotate-12" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 mb-2 hover:bg-blue-500/20">PHASE 2</Badge>
                      <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Platinum 10</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-mono font-bold text-blue-500">10</div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500">MINUTES</div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-lg leading-relaxed mb-8 border-l-2 border-blue-500/30 pl-6">
                    The first 10 minutes decide whether the patient stabilizes or deteriorates.
                    In this phase, correct actions matter more than speed alone — especially for <span className="text-white font-bold decoration-blue-500/50 underline underline-offset-4">trauma, cardiac arrest, choking, seizure</span>.
                  </p>

                  <div className="grid gap-4">
                    {[
                      "Immediate steps: airway, breathing, circulation (basic life support).",
                      "Quick bleeding control reduces risk of shock and loss of consciousness.",
                      "Best time to choose the right hospital and alert them early.",
                      "Reduces confusion and delays caused by panic + wrong first decisions."
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-slate-950/50 border border-slate-800/50 hover:border-blue-500/30 transition-colors">
                        <div className="min-w-[6px] h-[6px] rounded-full bg-blue-500 mt-2 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <p className="text-sm text-slate-400">{text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-500 text-xs font-bold tracking-widest uppercase">
                      <ShieldCheck className="w-4 h-4" /> Action: Immediate
                    </div>
                    <div className="text-slate-600 font-mono text-xs">ID: PLTM-10</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3) Emergency Timeline Section (Detailed) */}
      <section id="timeline" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-8 text-xl px-8 py-4 shadow-[0_0_30px_rgba(245,158,11,0.6)] border-amber-500 text-amber-500 font-mono tracking-widest uppercase animate-pulse border-2">The Timeline</Badge>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">First 10 Minutes: The Critical Path</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">This is exactly what happens when you use CareBridge. No guessing, just action.</p>
          </div>

          <div className="relative max-w-4xl mx-auto pl-6 md:pl-0">
            {/* Vertical Line */}
            <div className="absolute left-[35px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/0 via-amber-500/20 to-amber-500/0 md:-translate-x-1/2"></div>

            <div className="space-y-8 relative">
              {[
                { time: "00:00", title: "Incident Detected", desc: "Fall detection or manual SOS triggered.", icon: AlertCircle, color: "text-red-500" },
                { time: "00:01", title: "Vitals Analyzed", desc: "Watch/Phone sensors check heart rate & impact.", icon: HeartPulse, color: "text-rose-500" },
                { time: "00:02", title: "Automated SOS", desc: "Location + Medical ID sent to contacts.", icon: Radio, color: "text-orange-500" },
                { time: "00:10", title: "Local Alert", desc: "Nearby trained volunteers (2km) notified.", icon: Users, color: "text-amber-500" },
                { time: "00:30", title: "Hospital Chosen", desc: "AI selects best ER based on traffic & equipment.", icon: MapPin, color: "text-yellow-500" },
                { time: "01:00", title: "Doctor Pre-notified", desc: "Patient data arrives at receiving hospital.", icon: FileText, color: "text-lime-500" },
                { time: "02:00", title: "Ambulance Dispatched", desc: "Nearest available unit re-routed instantly.", icon: Ambulance, color: "text-green-500" },
                { time: "05:00", title: "Green Corridor", desc: "Traffic lights synced for ambulance path.", icon: Zap, color: "text-emerald-500" },
                { time: "08:00", title: "First Aid On-Site", desc: "Paramedics arrive with patient history known.", icon: Shield, color: "text-teal-500" },
                { time: "10:00", title: "ER Handover", desc: "Zero paperwork. Straight to treatment.", icon: CheckCircle2, color: "text-cyan-500" }
              ].map((step, index) => (
                <div key={index} className="relative flex items-center md:justify-center group">

                  {/* Timeline Node */}
                  <div className="absolute left-[26px] md:left-1/2 md:-translate-x-1/2 w-5 h-5 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 rounded-full z-10 group-hover:scale-125 group-hover:border-amber-500 transition-all duration-300">
                    <div className="absolute inset-0.5 bg-slate-200 dark:bg-slate-700 rounded-full group-hover:bg-amber-500 transition-colors"></div>
                  </div>

                  {/* Content */}
                  <div className={`flex flex-col md:flex-row w-full items-start md:items-center gap-4 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                    {/* Empty side for layout balance */}
                    <div className="hidden md:block md:w-1/2"></div>

                    {/* Card */}
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                      <div className="flex items-center gap-2 mb-1 md:justify-end md:group-even:justify-start">
                        <span className="font-mono text-sm font-bold text-slate-400 group-hover:text-amber-500 transition-colors">{step.time}</span>
                        <step.icon className={`w-4 h-4 ${step.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-amber-500 transition-colors">{step.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4) Case Study Comparison (Ramesh vs Suresh) - Split Screen Sim */}
      <section id="example" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-8 text-xl px-8 py-4 shadow-[0_0_30px_rgba(59,130,246,0.6)] border-blue-500 text-blue-500 font-mono tracking-widest uppercase animate-pulse border-2">Real World Scenario</Badge>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Same Emergency. <span className="text-indigo-600">Two Outcomes.</span></h2>
              <p className="text-slate-500">Meet Ramesh and Suresh. Both faced a cardiac arrest at 9:00 PM.</p>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-950">
              <div className="grid md:grid-cols-2 relative">

                {/* Center Axis (Desktop only) */}
                <div className="absolute left-1/2 top-4 bottom-4 w-px bg-slate-100 dark:bg-slate-800/50 hidden md:block z-10">
                  <div className="sticky top-1/2 -translate-y-1/2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full py-2 px-4 text-xs font-bold text-slate-400 z-20 shadow-sm flex flex-col items-center gap-1">
                    <span>VS</span>
                  </div>
                </div>

                {/* Left: Ramesh (Red tint - Critical) */}
                <div className="p-8 md:p-12 relative bg-red-50/30 dark:bg-red-950/10">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>

                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center font-bold text-2xl text-red-600 dark:text-red-400 shadow-inner">R</div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Ramesh (No App)</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        <p className="text-sm font-mono text-red-600 dark:text-red-400 uppercase tracking-wider">System Failure</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 relative border-l border-red-200 dark:border-red-900/30 pl-8 ml-4">
                    {[
                      { time: "9:00 PM", text: "Ramesh feels unusual chest tightness and sweating, but ignores it thinking it’s acidity." },
                      { time: "9:05 PM", text: "Ramesh suddenly feels dizzy. His wife panics and tries calling a family doctor (no response)." },
                      { time: "9:08 PM", text: "She searches Google: “chest pain emergency”. Confusing results increase fear and delay decisions." },
                      { time: "9:12 PM", text: "She calls a neighbor for help. They decide to drive to the nearest clinic instead of ER." },
                      { time: "9:18 PM", text: "They waste time collecting old prescription papers and medical history from drawers." },
                      { time: "9:25 PM", text: "They reach a small clinic… but it is already closed. No emergency staff available." },
                      { time: "9:30 PM", text: "Now they decide to go to a bigger hospital 5–7 km away. Traffic gets worse." },
                      { time: "9:38 PM", text: "Ramesh becomes less responsive. Wife tries calling ambulance helpline, but gives incomplete location." },
                      { time: "9:45 PM", text: "Emergency room is crowded. They struggle with registration and documents first." },
                      { time: "9:55 PM", text: "Doctor finally checks ECG. Critical delay has already caused major damage." },
                    ].map((item, i) => (
                      <div key={i} className="relative group">
                        <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full border-2 border-red-200 dark:border-red-900 bg-white dark:bg-slate-900 group-hover:bg-red-500 transition-colors"></div>
                        <span className="text-xs font-mono text-red-400 mb-1 block opacity-70">{item.time}</span>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">{item.text}</p>
                      </div>
                    ))}

                    <div className="mt-8 p-4 bg-red-100/50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-900/50">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold mb-1">
                        <AlertTriangle className="w-4 h-4" /> CRITICAL OUTCOME
                      </div>
                      <p className="text-sm text-red-800/70 dark:text-red-300/70">
                        Arrived too late. Severe complications due to delayed response and wrong first decisions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Suresh (Emerald tint - Optimal) */}
                <div className="p-8 md:p-12 relative bg-emerald-50/30 dark:bg-emerald-950/10">
                  <div className="absolute top-0 right-0 w-full h-1 bg-emerald-500/50"></div>

                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center font-bold text-2xl text-emerald-600 dark:text-emerald-400 shadow-inner">S</div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Suresh (With App)</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Optimal Path</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 relative border-l border-emerald-200 dark:border-emerald-900/30 pl-8 ml-4">
                    {[
                      { time: "9:00 PM", text: "Suresh feels sudden chest pain + breathlessness. He opens CareBridge instantly." },
                      { time: "9:01 PM", text: "He taps “Emergency Mode”. App auto-shares live location with family + emergency contacts." },
                      { time: "9:02 PM", text: "Quick symptom flow detects high-risk cardiac signs (jaw pain, sweating, heaviness)." },
                      { time: "9:03 PM", text: "AI triage labels it “Critical”. App shows nearest best cardiac ER: City Hospital." }, // Keeping underline logic in mind
                      { time: "9:04 PM", text: "One-tap ambulance request sent with accurate location + patient condition summary." },
                      { time: "9:05 PM", text: "Family receives alert: “Suresh in Emergency Mode”. Wife sees live tracking + ETA." },
                      { time: "9:06 PM", text: "CareBridge suggests first-aid steps: keep calm, sit upright, avoid walking, loosen clothing." },
                      { time: "9:07 PM", text: "Hospital is pre-notified with basic medical history + emergency profile (allergies, age, BP risk)." },
                      { time: "9:09 PM", text: "Ambulance arrives. QR-based fast check-in shared to reduce hospital entry time." },
                      { time: "9:11 PM", text: "Traffic-optimized route activates. Navigation keeps updating every 30 seconds." },
                      { time: "9:14 PM", text: "Emergency team is ready at ER gate. Minimal paperwork required." },
                      { time: "9:15 PM", text: "ECG + vitals started immediately. Treatment begins within minutes." },
                    ].map((item, i) => (
                      <div key={i} className="relative group">
                        <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full border-2 border-emerald-200 dark:border-emerald-900 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                        <span className="text-xs font-mono text-emerald-500 mb-1 block font-bold">{item.time}</span>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                          {i === 3 ? <>AI triage labels it “Critical”. App shows nearest best cardiac ER: <span className="underline decoration-emerald-500/50 underline-offset-4">City Hospital</span>.</> : item.text}
                        </p>
                      </div>
                    ))}

                    <div className="mt-8 p-4 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold mb-1">
                        <CheckCircle2 className="w-4 h-4" /> SUCCESSFUL OUTCOME
                      </div>
                      <p className="text-sm text-emerald-800/70 dark:text-emerald-300/70">
                        Arrived fast with correct hospital choice. Condition stabilized, higher chance of recovery.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Comparative Footer */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="text-sm font-mono text-slate-500">SIMULATION RESULT #8492</div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-sm">Time Saved:</span>
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 px-3 py-1 text-lg">40 MIN</Badge>
                </div>
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <div className="w-full max-w-2xl bg-slate-900 text-white rounded-full p-1 pl-6 pr-2 flex items-center justify-between shadow-2xl border border-slate-800">
                <span className="text-sm font-medium text-slate-300">Don't be like Ramesh. Be prepared.</span>
                <Button className="rounded-full bg-white text-slate-900 hover:bg-slate-200 font-bold px-6 h-10">
                  Get CareBridge
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 6) Gamified Feature Controller (High Fidelity) */}
      < section id="solution" className="py-24 bg-slate-950 border-y border-slate-900 overflow-hidden relative" >
        {/* Background Grid for High Tech Feel */}
        < div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" ></div >

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-8 text-xl px-8 py-4 shadow-[0_0_30px_rgba(16,185,129,0.6)] border-emerald-500 text-emerald-500 font-mono tracking-widest uppercase animate-pulse border-2">The Solution</Badge>
              <h2 className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-8 tracking-tighter drop-shadow-2xl break-words">INTRODUCING<br />CAREBRIDGE</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-xl">The world's first offline-ready emergency survival system.</p>
            </div>

            <GamifiedController />
          </div>
        </div>
      </section >


      {/* 8) AI Smart Features */}
      < section id="ai" className="py-24 bg-slate-950 text-white relative overflow-hidden" >
        <div className="absolute inset-0 bg-indigo-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-16">
            <Badge className="bg-indigo-500 text-white border-none mb-4">BUILT-IN INTELLIGENCE</Badge>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Smart Guidance. <br /><span className="text-slate-400">Not just chat.</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/50 border-slate-800 text-slate-300">
              <CardContent className="p-8">
                <Brain className="w-10 h-10 text-indigo-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Symptom Interpretation</h3>
                <p>Describe what you feel. CareBridge assesses urgency using medical protocols, not generic AI text.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-slate-800 text-slate-300">
              <CardContent className="p-8">
                <Search className="w-10 h-10 text-purple-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">First Aid Search</h3>
                <p>Instant access to offline-ready guides for burns, cuts, CPR, and more. Visual and voice-guided.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-slate-800 text-slate-300">
              <CardContent className="p-8">
                <Sparkles className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Personalized Insights</h3>
                <p>Tracks patterns in your health data to suggest posture corrections, hydration goals, and more.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section >

      {/* 7) Technology Stack (Playful & Unique) */}
      <section id="technology" className="py-32 bg-slate-950 relative overflow-hidden">
        {/* Playful Background Elements */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">

          <div className="text-center mb-20">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20"></div>
              <Badge variant="outline" className="relative mb-8 text-2xl px-8 py-4 shadow-[0_0_30px_rgba(99,102,241,0.6)] border-indigo-500 text-indigo-400 font-mono tracking-widest uppercase animate-pulse bg-transparent border-2">
                Tech Stack Used
              </Badge>
            </div>

            <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-8 tracking-tight">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400">Chaos.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
              We engineered a system that thrives when everything else breaks.
              Offline-first. Low-latency. <span className="text-white font-bold">Bulletproof.</span>
            </p>
            {/* Unique "Floater" Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">

              {/* 1. Mobile Core (Large Left) */}
              <div className="md:col-span-7 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                  <Smartphone className="w-48 h-48 text-indigo-500" />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.1)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Mobile Core</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["React Native", "Expo Router", "Zustand", "TypeScript"].map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-indigo-200 border border-indigo-500/20">{tag}</span>
                    ))}
                  </div>
                  <p className="text-slate-400 leading-relaxed text-lg">
                    A high-performance shell built on Expo. It handles complex navigation and state management ensuring smooth 60fps animations even on low-end devices.
                  </p>
                </div>
              </div>

              {/* 2. Real-time (Small Top Right) */}
              <div className="md:col-span-5 bg-gradient-to-br from-purple-900/20 to-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-lg">
                      <Zap className="w-7 h-7" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold animate-pulse">
                      LIVE
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Sync Layer</h3>
                  <p className="text-slate-400 text-sm mb-4">WebSocket + Socket.IO pipeline.</p>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[80%] animate-progress-indeterminate"></div>
                  </div>
                </div>
              </div>

              {/* 3. Offline (Medium Bottom Right) */}
              <div className="md:col-span-5 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-6 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-lg">
                    <WifiOff className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Zero Network? No Problem.</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Local-first architecture using MMKV + SQLite. The app works fully offline for first-aid and basic routing.
                  </p>
                </div>
              </div>

              {/* 4. AI & Map (Large Width) */}
              <div className="md:col-span-7 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-lg">
                      <Brain className="w-7 h-7" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg">
                      <MapPin className="w-7 h-7" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Intelligent Routing</h3>
                  <p className="text-slate-400 text-sm">
                    AI Triage output feeds directly into the Navigation Engine.
                    <span className="block mt-2 text-emerald-400 font-mono text-xs">INPUT: "Severe Chest Pain" - OUTPUT: "Cardiac Center (1.2km)"</span>
                  </p>
                </div>

                {/* Visual Decorator */}
                <div className="w-full md:w-48 h-32 bg-black/20 rounded-xl border border-white/5 flex items-center justify-center font-mono text-[10px] text-slate-500 p-4">
                  <code>
                    {`{ urgency: "CRITICAL", target: "ER_01", eta: 300 }`}
                  </code>
                </div>
              </div>

            </div>

            {/* New Architectural Flow - "Pipeline Style" */}
            <div className="mt-24">
              <div className="flex items-center justify-center gap-2 mb-12">
                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                <span className="text-sm font-mono text-slate-500 uppercase tracking-widest mx-4">Data Velocity Pipeline</span>
                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
              </div>

              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-indigo-900 via-indigo-500 to-indigo-900 rounded-full md:block hidden opacity-30"></div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                  {[
                    { icon: AlertCircle, label: "Trigger", step: "01" },
                    { icon: Brain, label: "AI Process", step: "02" },
                    { icon: Server, label: "Dispatch", step: "03" },
                    { icon: MapPin, label: "Arrival", step: "04" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center group cursor-default">
                      <div className="w-20 h-20 rounded-full bg-slate-950 border-4 border-slate-900 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300 group-hover:border-indigo-500">
                        <item.icon className="w-8 h-8 text-indigo-400 group-hover:text-white transition-colors" />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold text-white border border-slate-700">
                          {item.step}
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <h4 className="font-bold text-white text-lg">{item.label}</h4>
                        <div className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">Pending...</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section >


      {/* 8) Impact Section (Game Stats Style) */}
      < section id="impact" className="py-24 bg-slate-950 relative overflow-hidden" >
        {/* Background Grid */}
        < div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e50a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e50a_1px,transparent_1px)] bg-[size:2rem_2rem]" ></div >

        <div className="container mx-auto px-4 max-w-6xl relative z-10">

          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Badge variant="outline" className="text-2xl px-8 py-4 shadow-[0_0_30px_rgba(168,85,247,0.6)] border-purple-500 text-purple-500 font-mono tracking-widest uppercase animate-pulse border-2">Impact</Badge>
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-black text-white leading-tight">
                Level Up <br /> <span className="text-slate-700">Your Safety.</span>
              </h2>
            </div>
            <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
              <div className="text-right">
                <div className="text-xs text-slate-500 uppercase font-bold">Total Simulations</div>
                <div className="text-2xl font-mono text-white">8,492</div>
              </div>
              <div className="h-10 w-px bg-slate-800"></div>
              <div className="text-right">
                <div className="text-xs text-slate-500 uppercase font-bold">Success Rate</div>
                <div className="text-2xl font-mono text-emerald-400">99.8%</div>
              </div>
            </div>
          </div>

          {/* Main "VS" Card (Game Match Result Style) */}
          <div className="relative mb-8 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-transparent to-emerald-500 rounded-[2.5rem] opacity-20 group-hover:opacity-40 transition-opacity blur-lg"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden flex flex-col md:flex-row">

              {/* Loser Side */}
              <div className="flex-1 p-8 md:p-12 bg-gradient-to-br from-red-950/20 to-transparent flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800/50">
                <div className="text-red-500 font-mono text-xs uppercase tracking-[0.2em] mb-4">Without CareBridge</div>
                <div className="text-6xl md:text-8xl font-black text-slate-800 text-stroke-red relative">
                  23<span className="text-4xl">m</span>
                  {/* X Mark Overlay */}
                  <X className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-red-500/20" />
                </div>
                <div className="mt-6 text-center">
                  <div className="text-red-400 font-bold mb-1">High Risk</div>
                  <p className="text-slate-500 text-sm">Critical Window Missed</p>
                </div>
              </div>

              {/* VS Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-950 rounded-full border-4 border-slate-900 flex items-center justify-center z-10 shadow-xl">
                <span className="font-black text-slate-700 italic text-xl">VS</span>
              </div>

              {/* Winner Side */}
              <div className="flex-1 p-8 md:p-12 bg-gradient-to-bl from-emerald-950/20 to-transparent flex flex-col items-center justify-center">
                <div className="text-emerald-500 font-mono text-xs uppercase tracking-[0.2em] mb-4">With CareBridge</div>
                <div className="text-6xl md:text-8xl font-black text-white relative drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                  04<span className="text-4xl">m</span>
                  {/* Check Mark Overlay */}
                  <Check className="absolute -top-4 -right-8 w-16 h-16 text-emerald-500 animate-bounce" />
                </div>
                <div className="mt-6 text-center">
                  <div className="text-emerald-400 font-bold mb-1">Optimal Outcome</div>
                  <p className="text-slate-500 text-sm">Golden Hour Secured</p>
                </div>
              </div>

            </div>
          </div>

          {/* Stat "Power-Ups" Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Lives Saved", val: "+5", sub: "per 1k cases", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
              { label: "Confusion", val: "-80%", sub: "decision fatigue", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
              { label: "Response", val: "10x", sub: "faster routing", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
              { label: "Family", val: "100%", sub: "peace of mind", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
            ].map((stat, i) => (
              <div key={i} className={`rounded-2xl border ${stat.border} ${stat.bg} p-6 flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform`}>
                <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-2`}>{stat.val}</div>
                <div className="text-white font-bold text-sm">{stat.label}</div>
                <div className="text-slate-500 text-xs mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </section >


      {/* 9) Download Section */}
      < section id="download" className="py-32 bg-white dark:bg-slate-950 flex items-center justify-center" >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Ready to be prepared?</h2>
          <div className="flex flex-col items-center gap-6">
            <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-slate-900 text-white hover:scale-105 transition-transform shadow-2xl">
              <Download className="w-6 h-6 mr-3" /> Download on Android
            </Button>
            <p className="text-slate-400 text-sm">Requires Android 8.0 or later</p>
          </div>
        </div>
      </section >

    </div >
  );
}
