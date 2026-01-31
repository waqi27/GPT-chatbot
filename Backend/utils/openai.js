import "dotenv/config";
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getOpenAIAPIResponse = async (message) => {
  try {
    if (!message) {
      throw new Error("Message is required");
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile", // Using the recommended model from Groq
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    return completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
  } catch (err) {
    console.error("❌ Error:", err.message);
    console.error("Full error details:", err); // Log full error for debugging
    throw err;
  }
};

export default getOpenAIAPIResponse;