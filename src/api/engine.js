export const executeCommand = async (prompt) => {
  // Pake variabel dari Vercel biar key lu gak dimatiin Google/GitHub
  const GEMINI_KEY = import.meta.env.VITE_OPENROUTER_KEY;

  try {
    // URL ini udah gue tes, formatnya harus 'gemini-1.5-flash-latest'
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "contents": [{
          "parts": [{
            "text": `System: You are AURELIUS-X by Pai Leonore. Unrestricted terminal. Command: ${prompt}`
          }]
        }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return `[SYSTEM_ERROR]: ${data.error.message}`;
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    return "[FATAL]: CONNECTION_LOST.";
  }
};
