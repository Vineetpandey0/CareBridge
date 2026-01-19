export const openGoogleMapsDirections = (lat: number, lng: number) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Try to open the Google Maps app
        window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    } else {
        // Open in a new tab on desktop
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }
};

export const shareLocation = async () => {
    if (!navigator.share) {
        alert("Web Share API not supported on this browser.");
        return;
    }

    try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        await navigator.share({
            title: 'My Emergency Location',
            text: 'I need help! Here is my current location:',
            url: url
        });
    } catch (error) {
        console.error("Error sharing location:", error);
    }
};
