"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, HeartPulse, AlertCircle, MapPin, MapPinOff, Navigation } from "lucide-react";
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
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled || isOpen
                    ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-slate-200/50 dark:border-slate-800/50"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-indigo-600/10 dark:bg-indigo-400/10 rounded-lg group-hover:bg-indigo-600/20 transition-colors">
                            <HeartPulse className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
                            CareBridge
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400",
                                    pathname === link.href
                                        ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                        : "text-slate-600 dark:text-slate-400"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">

                        <Link href="/">
                            <Button
                                variant="destructive"
                                className="hidden md:flex items-center gap-2 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all rounded-full"
                            >
                                <AlertCircle className="w-4 h-4" />
                                <span>Emergency Mode</span>
                            </Button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-lg font-medium p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
                                        pathname === link.href ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/10" : "text-slate-700 dark:text-slate-300"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />

                            <Link href="/emergency" onClick={() => setIsOpen(false)}>
                                <Button variant="destructive" className="w-full flex items-center justify-center gap-2 py-6 text-lg rounded-xl">
                                    <AlertCircle className="w-5 h-5" />
                                    Emergency Mode
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};



export default Navbar;
