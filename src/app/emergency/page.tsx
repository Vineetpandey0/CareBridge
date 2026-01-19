"use client";

import Link from "next/link";
import { Phone, MapPin, HeartPulse, Flame, AlertTriangle, Activity, Share2, Brain, Ambulance } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FirstAidModal } from "@/components/features/FirstAidModal";
import { FIRST_AID_GUIDES } from "@/data/firstAidGuides";
import { shareLocation } from "@/lib/maps";

export default function EmergencyPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
                <div className="p-4 bg-destructive/10 rounded-full animate-pulse">
                    <AlertTriangle className="w-12 h-12 text-destructive" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold font-display text-destructive">EMERGENCY MODE</h1>
                <p className="text-xl font-medium text-foreground/80 max-w-2xl">
                    Stay Calm. Prioritize Safety. Act Fast.
                </p>
            </div>

            {/* Quick Action Grid - 1 Tap Friendly */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <a href="tel:112" className="block transform hover:scale-[1.02] transition-transform">
                    <Card className="bg-destructive text-destructive-foreground border-none shadow-2xl shadow-destructive/30 h-full">
                        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4 text-center h-full min-h-[220px]">
                            <Phone className="w-16 h-16 animate-bounce" />
                            <div>
                                <h2 className="text-3xl font-bold">CALL AMBULANCE</h2>
                                <p className="text-lg opacity-90 mt-1">Tap to Call 112 / 102</p>
                            </div>
                        </CardContent>
                    </Card>
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/find-care" className="block transform hover:scale-[1.02] transition-transform h-full">
                        <Card className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/30 h-full">
                            <CardContent className="flex flex-col items-center justify-center p-6 space-y-3 text-center h-full">
                                <MapPin className="w-10 h-10 text-blue-600" />
                                <div>
                                    <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">Find Hospital</h2>
                                    <p className="text-sm text-blue-700 dark:text-blue-300">Navigate to nearest care</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <button onClick={shareLocation} className="block w-full text-left transform hover:scale-[1.02] transition-transform h-full">
                        <Card className="border-2 border-green-500 bg-green-50 dark:bg-green-900/20 h-full">
                            <CardContent className="flex flex-col items-center justify-center p-6 space-y-3 text-center h-full">
                                <Share2 className="w-10 h-10 text-green-600" />
                                <div>
                                    <h2 className="text-xl font-bold text-green-900 dark:text-green-100">Share Location</h2>
                                    <p className="text-sm text-green-700 dark:text-green-300">Send coordinates to help</p>
                                </div>
                            </CardContent>
                        </Card>
                    </button>
                </div>
            </div>

            <Separator className="my-12 h-1 bg-border" />

            {/* First Aid Micro-Guides */}
            <section>
                <h2 className="text-3xl font-bold font-display mb-8 flex items-center gap-3">
                    <HeartPulse className="w-8 h-8 text-destructive" />
                    First Aid Quick-Guides
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FIRST_AID_GUIDES.map((guide) => (
                        <Card key={guide.id} className="cursor-pointer hover:border-primary/50 transition-all flex flex-col justify-between">
                            <CardHeader className="bg-muted/30 pb-4 border-b">
                                <div className="flex items-center gap-3">
                                    <GuideIcon iconName={guide.icon} />
                                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 flex-1">
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{guide.description}</p>
                                <FirstAidModal guide={guide} />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}

function GuideIcon({ iconName }: { iconName: string }) {
    switch (iconName) {
        case "HeartPulse": return <HeartPulse className="w-6 h-6 text-red-500" />;
        case "Droplets": return <Activity className="w-6 h-6 text-red-600" />; // Fallback icon for bleeding
        case "AlertTriangle": return <AlertTriangle className="w-6 h-6 text-amber-500" />;
        case "Flame": return <Flame className="w-6 h-6 text-orange-500" />;
        case "Brain": return <Brain className="w-6 h-6 text-purple-500" />;
        default: return <Activity className="w-6 h-6 text-primary" />;
    }
}
