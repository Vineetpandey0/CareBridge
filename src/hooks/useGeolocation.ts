import { useState, useEffect } from "react";

interface Location {
    latitude: number;
    longitude: number;
}

interface GeolocationError {
    code: number;
    message: string;
}

export function useGeolocation() {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<GeolocationError | null>(null);
    const [loading, setLoading] = useState(false);
    const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

    useEffect(() => {
        // Load saved state
        const saved = localStorage.getItem("carebridge_location_decision");
        setPermissionStatus(saved);

        if (saved === "allowed") {
            getLocation();
        }
    }, []);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setError({ code: 0, message: "Geolocation is not supported by your browser." });
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setLoading(false);
                setError(null);
                localStorage.setItem("carebridge_location_decision", "allowed");
                setPermissionStatus("allowed");
            },
            (err) => {
                setError({ code: err.code, message: err.message });
                setLoading(false);
                // Don't auto-set to denied strictly here as it might be a transient error/timeout, 
                // but usually if user blocks it, code is 1.
                if (err.code === 1) {
                    localStorage.setItem("carebridge_location_decision", "denied");
                    setPermissionStatus("denied");
                }
            }
        );
    };

    return { location, error, loading, permissionStatus, getLocation };
}
