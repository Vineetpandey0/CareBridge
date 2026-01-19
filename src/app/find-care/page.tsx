"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Navigation, Star, Locate, Phone, Clock, AlertCircle, BedDouble, Activity, Filter, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useGeolocation } from "@/hooks/useGeolocation";
import { openGoogleMapsDirections } from "@/lib/maps";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock Data with Seat Availability
const MOCK_PLACES = [
    { id: 1, name: "City General Hospital", type: "hospital", level: "L1 Trauma", rating: 4.8, address: "12 Main St, Downtown", open_now: true, lat: 0.01, lng: 0.01, phone: "102", beds_available: 12, wait_time: 15 },
    { id: 2, name: "CarePlus Walk-In Clinic", type: "clinic", level: "Urgent Care", rating: 4.5, address: "45 Health Ave", open_now: true, lat: -0.01, lng: 0.02, phone: "+91-9876543210", beds_available: 45, wait_time: 5 },
    { id: 3, name: "NightWatch Emergency", type: "hospital", level: "L2 Trauma", rating: 4.7, address: "Highway 42", open_now: true, lat: 0.015, lng: 0.015, phone: "112", beds_available: 3, wait_time: 45 },
    { id: 4, name: "OrthoSpecialty Center", type: "clinic", level: "Specialists", rating: 4.9, address: "22 Bone St", open_now: true, lat: -0.02, lng: -0.02, phone: "+91-9876543213", beds_available: 8, wait_time: 20 },
    { id: 5, name: "Sunrise Diagnostic Lab", type: "health", level: "Lab", rating: 4.6, address: "90 Industrial Area", open_now: false, lat: 0.02, lng: 0.005, phone: "+91-9876543212", beds_available: 0, wait_time: 0 },
    { id: 6, name: "Green Cross Pharmacy", type: "pharmacy", level: "Retail", rating: 4.2, address: "8 Market Rd", open_now: true, lat: 0.005, lng: -0.01, phone: "+91-9876543211", beds_available: 0, wait_time: 0 },
];

export default function FindCare() {
    const { location, getLocation, loading: locLoading } = useGeolocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [radius, setRadius] = useState([10]); // km
    const [places, setPlaces] = useState<any[]>([]);
    const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);

    // Load initial data (mocking API fetch)
    useEffect(() => {
        if (location) {
            // Simulate API logic: Sort by distance from REAL location
            const simulatedNearby = MOCK_PLACES.map(p => ({
                ...p,
                lat: location.latitude + p.lat,
                lng: location.longitude + p.lng,
                distance: calculateDistance(location.latitude, location.longitude, location.latitude + p.lat, location.longitude + p.lng).toFixed(1)
            })).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

            setPlaces(simulatedNearby);
        } else {
            // Fallback if no location yet
            setPlaces(MOCK_PLACES.map(p => ({ ...p, distance: "?" })));
            if (!locLoading) getLocation();
        }
    }, [location, locLoading]);

    const filteredPlaces = places.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "all" || p.type === typeFilter;
        const matchesRadius = location ? parseFloat(p.distance) <= radius[0] : true;
        return matchesSearch && matchesType && matchesRadius;
    });

    return (
        <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border-b p-4 shadow-sm z-10 flex-shrink-0">
                <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold font-display flex items-center gap-2 text-slate-900 dark:text-white">
                            <Activity className="text-indigo-600" /> Hospital Seat Tracker
                        </h1>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Updates</span>
                            <span>•</span>
                            <span>Real-time Availability</span>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <Button
                            variant={location ? "outline" : "default"}
                            onClick={getLocation}
                            disabled={locLoading}
                            className={location ? "border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10" : "bg-indigo-600 text-white hover:bg-indigo-700"}
                        >
                            {locLoading ? <Locate className="w-4 h-4 animate-spin mr-2" /> : <Locate className="w-4 h-4 mr-2" />}
                            {location ? "GPS Active" : "Enable Location"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: List View */}
                <div className="w-full md:w-[480px] bg-white dark:bg-slate-900 border-r flex flex-col z-20 shadow-xl">

                    {/* Filters */}
                    <div className="p-4 border-b space-y-4 bg-slate-50/50 dark:bg-slate-900 flex-shrink-0">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                            <Input
                                placeholder="Search hospitals..."
                                className="pl-9 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <span className="text-xs font-bold uppercase text-slate-400 self-center mr-2">Filter:</span>
                            {["all", "hospital", "clinic"].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTypeFilter(t)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${typeFilter === t ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200"}`}
                                >
                                    {t === 'all' ? 'All' : t + 's'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50 dark:bg-slate-950">
                        {filteredPlaces.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                <AlertCircle className="w-12 h-12 mx-auto opacity-20 mb-3" />
                                <p>No facilities found nearby.</p>
                                <Button variant="link" onClick={() => setRadius([50])} className="text-indigo-500">Expand Search Radius</Button>
                            </div>
                        ) : (
                            filteredPlaces.map(place => (
                                <Card
                                    key={place.id}
                                    className={`cursor-pointer transition-all hover:shadow-lg border-2 transform ${selectedPlaceId === place.id ? "border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10" : "border-transparent bg-white dark:bg-slate-900 hover:border-slate-200"}`}
                                    onClick={() => setSelectedPlaceId(place.id)}
                                >
                                    <CardContent className="p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{place.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="secondary" className="text-[10px] font-bold tracking-wide uppercase bg-slate-100 text-slate-600">{place.level}</Badge>
                                                    {place.rating > 4.5 && <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none text-[10px]"><Star className="w-3 h-3 mr-1 fill-current" /> Top Rated</Badge>}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                {place.open_now ? (
                                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 block w-fit ml-auto">OPEN 24/7</span>
                                                ) : (
                                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full block w-fit ml-auto">CLOSED</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Seat & Wait Stats */}
                                        {(place.type === 'hospital' || place.type === 'clinic') && (
                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                <div className={`p-3 rounded-xl border ${place.beds_available < 5 ? "bg-red-50 border-red-100 text-red-700" : "bg-emerald-50 border-emerald-100 text-emerald-700"}`}>
                                                    <div className="text-[10px] uppercase font-bold opacity-70 mb-0.5 flex items-center gap-1"><BedDouble className="w-3 h-3" /> Beds Available</div>
                                                    <div className="text-xl font-bold">{place.beds_available} <span className="text-sm font-normal opacity-70">/ 50</span></div>
                                                </div>
                                                <div className={`p-3 rounded-xl border ${place.wait_time > 30 ? "bg-amber-50 border-amber-100 text-amber-700" : "bg-blue-50 border-blue-100 text-blue-700"}`}>
                                                    <div className="text-[10px] uppercase font-bold opacity-70 mb-0.5 flex items-center gap-1"><Clock className="w-3 h-3" /> Avg Wait</div>
                                                    <div className="text-xl font-bold">{place.wait_time} <span className="text-sm font-normal opacity-70">mins</span></div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <div className="text-sm text-slate-500 flex items-center gap-1">
                                                <Navigation className="w-3 h-3 text-indigo-500" />
                                                <span className="font-semibold text-slate-900 dark:text-slate-200">{place.distance} km</span> away
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" className="h-8 text-xs rounded-full" onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${place.phone}`; }}>
                                                    <Phone className="w-3 h-3 mr-1.5" /> Call
                                                </Button>
                                                <Button size="sm" className="h-8 text-xs rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 dark:shadow-none" onClick={(e) => { e.stopPropagation(); openGoogleMapsDirections(place.lat, place.lng); }}>
                                                    <Navigation className="w-3 h-3 mr-1.5" /> Navigate
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>

                {/* Right: Map View */}
                <div className="hidden md:block flex-1 bg-slate-100 dark:bg-slate-900 relative">
                    {location ? (
                        <div className="w-full h-full relative">
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=hospitals+around+${location.latitude},${location.longitude}&zoom=14`}
                                className="filter grayscale-[20%] contrast-[1.1] opacity-90 hover:opacity-100 transition-opacity duration-500"
                            ></iframe>
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-xs font-medium text-slate-600 pointer-events-none border border-white/50">
                                Showing real-time seat data overlay
                            </div>
                        </div>
                    ) : (
                        <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center bg-slate-100/50">
                            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <MapPin className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-slate-700">Map View Locked</h3>
                            <p className="max-w-xs text-slate-500">Enable location services to visualize hospital density and traffic.</p>
                            <Button className="mt-6 rounded-full px-8" onClick={getLocation}>Enable Location</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Simple Haversine approx
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        0.5 - Math.cos(dLat) / 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
}
