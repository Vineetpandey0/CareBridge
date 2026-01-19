"use client";

import { useState, useEffect } from "react";
import { MapPin, Navigation, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useGeolocation } from "@/hooks/useGeolocation";

export function LocationModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { getLocation } = useGeolocation();

    useEffect(() => {
        // Check if user has already made a choice
        const hasDecision = localStorage.getItem("carebridge_location_decision");

        // Only open if no decision made
        if (!hasDecision) {
            // Small delay for better UX on load
            const timer = setTimeout(() => setIsOpen(true), 1500); // 1.5s delay for smooth entry
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAllow = () => {
        getLocation(); // This triggers the browser prompt
        localStorage.setItem("carebridge_location_decision", "allowed");
        setIsOpen(false);
    };

    const handleManual = () => {
        localStorage.setItem("carebridge_location_decision", "manual");
        setIsOpen(false);
        // Logic for manual would go here (e.g. redirect to find-care with manual input focus)
    };

    const handleSkip = () => {
        localStorage.setItem("carebridge_location_decision", "denied");
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md border-none shadow-2xl bg-white dark:bg-slate-900" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader className="flex flex-col items-center text-center gap-2">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full animate-pulse">
                        <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <DialogTitle className="text-2xl font-bold font-display">Enable Location for Nearby Help</DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground max-w-xs mx-auto">
                        Used <strong>only</strong> for finding nearby hospitals & navigation. Not stored remotely.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3 mt-4">
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20" onClick={handleAllow}>
                        <Navigation className="w-4 h-4 mr-2" /> Allow Location Access
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleManual}>
                        Enter Location Manually
                    </Button>
                    <Button variant="ghost" className="w-full text-muted-foreground text-sm" onClick={handleSkip}>
                        Continue Without Location
                    </Button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground bg-muted/50 py-2 rounded-lg">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Safe: Local use only. Not tracked.
                </div>
            </DialogContent>
        </Dialog>
    );
}
