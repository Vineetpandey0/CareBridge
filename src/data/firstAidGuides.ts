export interface FirstAidGuide {
    id: string;
    title: string;
    icon: string; // Lucide icon name or emoji
    description: string;
    steps: string[];
    dos: string[];
    donts: string[];
    whenToCall: string;
}

export const FIRST_AID_GUIDES: FirstAidGuide[] = [
    {
        id: "cpr",
        title: "CPR (Adult)",
        icon: "HeartPulse",
        description: "For unresponsive victim who is NOT breathing.",
        steps: [
            "Check for response & breathing.",
            "Call Ambulance immediately.",
            "Place hands in center of chest.",
            "Push hard and fast (100-120 bpm).",
            "Give 30 compressions, then 2 breaths."
        ],
        dos: ["Push at least 2 inches deep", "Allow chest recoil"],
        donts: ["Do not stop unless exhausted", "Do not ignore gasping breaths"],
        whenToCall: "IMMEDIATELY if unresponsive."
    },
    {
        id: "bleeding",
        title: "Severe Bleeding",
        icon: "Droplets",
        description: "Control heavy bleeding to prevent shock.",
        steps: [
            "Apply direct pressure with cloth.",
            "Keep pressure constant.",
            "Elevate the wound if possible.",
            "Apply second bandage over first if needed."
        ],
        dos: ["Use clean cloth", "Keep patient warm"],
        donts: ["Do NOT remove objects stuck in wound", "Do NOT check wound frequently"],
        whenToCall: "Blood soaks through bandages or won't stop."
    },
    {
        id: "choking",
        title: "Choking",
        icon: "AlertTriangle",
        description: "When airway is blocked.",
        steps: [
            "Ask 'Are you choking?'",
            "Give 5 back blows between shoulder blades.",
            "Give 5 abdominal thrusts (Heimlich).",
            "Repeat 5 & 5 until object clears."
        ],
        dos: ["Stand behind victim", "Make a fist above navel"],
        donts: ["Do NOT give water", "Do NOT hit on back if they can cough"],
        whenToCall: "Victim becomes unconscious."
    },
    {
        id: "burns",
        title: "Burns",
        icon: "Flame",
        description: "Thermal or chemical burns.",
        steps: [
            "Cool with running tap water (10-20 mins).",
            "Remove jewelry/tight items near burn.",
            "Cover with clean cling film or cloth."
        ],
        dos: ["Keep flush with cool water", "Keep patient warm"],
        donts: ["Do NOT apply ice", "Do NOT break blisters", "Do NOT use butter/creams"],
        whenToCall: "Burn is larger than a palm or on face/hands."
    },
    {
        id: "stroke",
        title: "Stroke (FAST)",
        icon: "Brain",
        description: "Sudden loss of brain function.",
        steps: [
            "Face: Is it drooping?",
            "Arms: Can they raise both?",
            "Speech: Is it slurred?",
            "Time: Call Ambulance NOW."
        ],
        dos: ["Note the time symptoms started", "Keep comfortable"],
        donts: ["Do NOT give food or water", "Do NOT let them sleep"],
        whenToCall: "IMMEDIATELY on any sign."
    },
    {
        id: "heart-attack",
        title: "Heart Attack",
        icon: "HeartPulse",
        description: "Chest pain, shortness of breath, anxiety.",
        steps: [
            "Call Ambulance immediately.",
            "Have victim sit down and rest.",
            "Loosen tight clothing.",
            "Ask if they have prescribed heart medication (nitroglycerin).",
            "Chew 300mg Aspirin if not allergic."
        ],
        dos: ["Keep calm and reassuring", "Monitor breathing"],
        donts: ["Do NOT leave them alone", "Do NOT ignore 'indigestion' pain"],
        whenToCall: "IMMEDIATELY. Every second counts."
    },
    {
        id: "seizure",
        title: "Seizure",
        icon: "Activity",
        description: "Uncontrolled shaking or loss of awareness.",
        steps: [
            "Clear space around them.",
            "Place something soft under head.",
            "Time the seizure.",
            "Turn on side after shaking stops."
        ],
        dos: ["Protect head from injury", "Loosen tight clothes"],
        donts: ["Do NOT hold them down", "Do NOT put anything in mouth"],
        whenToCall: "Seizure lasts > 5 mins or repeats."
    },
    {
        id: "heatstroke",
        title: "Heatstroke",
        icon: "Sun",
        description: "High body temp, confusion, no sweating.",
        steps: [
            "Move to cool place.",
            "Remove excess clothing.",
            "Cool with damp cloths or water spray.",
            "Fan the person."
        ],
        dos: ["Give small sips of water if conscious", "Apply ice packs to armpits/groin"],
        donts: ["Do NOT give aspirin", "Do NOT force water if confused"],
        whenToCall: "Unconscious or temp > 40°C."
    },
    {
        id: "fainting",
        title: "Fainting",
        icon: "User",
        description: "Brief loss of consciousness.",
        steps: [
            "Lie them on back.",
            "Elevate legs above heart level.",
            "Loosen constrictive clothing.",
            "Check breathing."
        ],
        dos: ["Fresh air", "Reassure when waking"],
        donts: ["Do NOT stand them up quickly", "Do NOT splash water on face"],
        whenToCall: "Doesn't wake in 1 min or injured."
    }
];
