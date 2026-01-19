import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini (only if key exists to avoid crash)
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: Request) {
    try {
        const { query, type = "guide" } = await req.json();

        if (!query) {
            return NextResponse.json({ error: "Query required" }, { status: 400 });
        }

        // If Key exists, try Real Gemini Mode
        if (genAI) {
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

                let systemPrompt = "";
                if (type === "symptom") {
                    systemPrompt = `You are CareBridge Clinical Engine.
Analyse the symptom description: "${query}".
Output valid JSON only. No markdown code blocks.
Structure:
{
  "riskLevel": "Low|Moderate|High|Critical",
  "summary": "Clinical summary...",
  "recommendedAction": "Action...",
  "whatToDoNow": ["step 1", "step 2", "step 3"],
  "warningSigns": ["sign 1", "sign 2", "sign 3"],
  "recommendedDepartment": "Dept Name",
  "ctaPrimary": "Find Nearest Hospital",
  "ctaSecondary": "Call Emergency",
  "disclaimer": "Guidance only. Seek professional medical help if severe."
}
Rules:
- Be concise.
- If keywords imply chest pain, heart, stoke, or trauma -> Critical.
- No "As an AI".
- The emergency contact alternative of 911 is 112. Dont use 911 in the response.
`;
                } else {
                    systemPrompt = `You are CareBridge FirstAidAgent.
Provide first aid for: "${query}".
Output valid JSON only. No markdown code blocks.
Structure:
{
  "title": "Title",
  "severity": "Low|Moderate|High|Critical",
  "whatToDo": ["step 1", "step 2", "step 3"],
  "whatNotToDo": ["avoid 1", "avoid 2"],
  "callEmergencyIf": ["trigger 1", "trigger 2"],
  "nextActionCTA": "Find Nearest Hospital",
  "disclaimer": "First aid guidance only. Seek professional help."
}
Rules:
- Prioritize life safety.
- Steps must be short and actionable.
- The emergency contact alternative of 911 is 112. Dont use 911 in the response.
`;
                }

                const result = await model.generateContent(systemPrompt);
                const response = await result.response;
                const text = response.text();

                // Clean markdown if present
                const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

                return NextResponse.json(JSON.parse(cleanJson));

            } catch (err) {
                console.warn("Gemini API Failed, falling back to Mock.", err);
                // Fallthrough to mock
            }
        }

        // -------------------------
        // FALLBACK: MOCK LOGIC (When no Key or Error)
        // -------------------------

        // SIMULATED LATENCY
        await new Promise(r => setTimeout(r, 1000));

        const q = query.toLowerCase();

        // MOCK: SYMPTOM
        if (type === "symptom") {
            let response = {
                riskLevel: "Moderate",
                summary: `Analysis for "${query}" suggests potential issues requiring attention.`,
                recommendedAction: "Monitor closely and seek medical advice if persistent.",
                whatToDoNow: [
                    "Rest and stay hydrated.",
                    "Monitor temperature and vitals.",
                    "Keep a log of symptom changes."
                ],
                warningSigns: [
                    "Sudden worsening of pain.",
                    "Difficulty breathing or chest tightness.",
                    "Confusion or lethargy."
                ],
                recommendedDepartment: "General Medicine",
                ctaPrimary: "Find Nearest Hospital",
                ctaSecondary: "Call Emergency",
                disclaimer: "Guidance only. Seek professional medical help if symptoms worsen or feel severe."
            };

            if (q.includes("chest") || q.includes("heart") || q.includes("pain")) {
                response.riskLevel = "Critical";
                response.summary = "Chest pain can indicate serious cardiac events.";
                response.recommendedAction = "Seek immediate emergency care.";
                response.whatToDoNow = ["Stop all activity immediately.", "Sit down and stay calm.", "Chew an aspirin if available (unless allergic)."];
                response.warningSigns = ["Pain radiating to arm/jaw.", "Shortness of breath.", "Cold sweat/nausea."];
                response.recommendedDepartment = "Emergency / Cardiology";
            }
            return NextResponse.json(response);
        }

        // MOCK: FIRST AID
        let mockResponse = {
            title: "First Aid for " + query,
            severity: "Moderate",
            whatToDo: [
                "Ensure the scene is safe.",
                "Calm the affected person.",
                "Assess for breathing and consciousness.",
                "Keep them comfortable."
            ],
            whatNotToDo: [
                "Do NOT ignore worsening symptoms.",
                "Do NOT give food/drink if surgery needed."
            ],
            callEmergencyIf: [
                "Condition worsens.",
                "Loss of consciousness."
            ],
            nextActionCTA: "Find Nearest Hospital",
            disclaimer: "First aid guidance only. Seek professional help."
        };

        if (q.includes("snake")) {
            mockResponse.title = "Snake Bite";
            mockResponse.severity = "Critical";
            mockResponse.whatToDo = ["Keep calm and STILL.", "Remove jewelry.", "Position below heart.", "Clean wound."];
            mockResponse.whatNotToDo = ["Do NOT suck venom.", "Do NOT use tourniquet.", "Do NOT cut wound."];
            mockResponse.callEmergencyIf = ["Suspected snake bite.", "Swelling/color change.", "Breathing issues."];
        }

        return NextResponse.json(mockResponse);

    } catch (error) {
        console.error("AI Agent Error:", error);
        return NextResponse.json({ error: "Failed to generate guide" }, { status: 500 });
    }
}
