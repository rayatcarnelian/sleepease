// Define the base URL for your FastAPI server
const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * Interface for the AI Chat response
 */
export interface ChatResponse {
    status: string;
    reply: string;
}

/**
 * Sends a student's mood/feeling to the TextBlob AI engine on the backend.
 * @param message The user's input text (e.g., "I'm feeling stressed")
 */
export const fetchAIAdvice = async (message: string): Promise<ChatResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Connection to SleepEase Backend failed:", error);
        return {
            status: "error",
            reply: "I'm having trouble connecting to my peace center. Please try again soon."
        };
    }
};