"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, HeartPulse, Download, MapPin, MapPinOff, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isLanding = pathname === "/";

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "The Problem", href: "/#problem" },
        { name: "Example", href: "/#example" },
        { name: "The Solution", href: "/#solution" },
        { name: "Technology", href: "/#technology" },
        { name: "Impact", href: "/#impact" },
    ];

    return (
        <>
            <nav
                className={cn(
                    "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
                    "w-[95%] max-w-5xl rounded-full border border-white/20 shadow-xl backdrop-blur-xl",
                    scrolled || isOpen
                        ? "bg-white/90 dark:bg-slate-900/90 shadow-2xl"
                        : "bg-white/70 dark:bg-slate-900/70"
                )}
            >
                <div className="px-6 h-16 md:h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-indigo-600 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform">
                            <HeartPulse className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                            CareBridge
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-full border border-white/10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-display font-medium transition-all duration-300",
                                    pathname === link.href
                                        ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-white/50 dark:hover:bg-slate-700/50"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        <Link href="#">
                            <Button
                                className="hidden md:flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 font-display"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download</span>
                            </Button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors bg-slate-100 dark:bg-slate-800 rounded-full"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Separate from Nav to avoid clipping/layout issues */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed top-24 left-4 right-4 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden md:hidden"
                    >
                        <div className="p-6 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-lg font-display font-medium p-4 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all",
                                        pathname === link.href ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/10" : "text-slate-700 dark:text-slate-300"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
                            <Link href="#" onClick={() => setIsOpen(false)}>
                                <Button className="w-full flex items-center justify-center gap-2 py-6 text-lg rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display">
                                    <Download className="w-5 h-5" />
                                    Download App
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};



export default Navbar;
