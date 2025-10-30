import { GoogleGenAI, Modality, Type } from "@google/genai";

export async function generateMockup(
  prompt: string,
  imageBase64: string,
  mimeType: string
): Promise<string[]> {
  // Assume process.env.API_KEY is available
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const generatedImages: string[] = [];
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          generatedImages.push(part.inlineData.data);
        }
      }
    }

    if (generatedImages.length === 0) {
      // Check for a text response which might indicate a safety block or other issue
      // Fix: Check if response.text exists before trimming
      const textResponse = response.text ? response.text.trim() : "";
      if (textResponse) {
        throw new Error(`Model returned a text response instead of an image: "${textResponse}"`);
      }
      throw new Error("No images were generated. The request may have been blocked due to safety settings.");
    }
    
    return generatedImages;
  } catch (error) {
    console.error("Error generating mockup:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate mockup: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the mockup.");
  }
}

export async function suggestPromptsForImage(
  imageBase64: string,
  mimeType: string,
  promptText: string
): Promise<string[]> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType,
            },
          },
          {
            text: promptText,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: "A creative mockup scene description."
          }
        }
      }
    });

    // Fix: Check if response.text exists before trimming
    const jsonString = response.text ? response.text.trim() : "";
    if (!jsonString) {
      throw new Error("Received an empty response from the AI for prompt suggestions.");
    }
    const suggestions = JSON.parse(jsonString);

    if (!Array.isArray(suggestions) || !suggestions.every(s => typeof s === 'string')) {
      throw new Error("Invalid response format from AI. Expected a JSON array of strings.");
    }
    
    return suggestions;
  } catch (error) {
    console.error("Error suggesting prompts:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to suggest prompts: ${error.message}`);
    }
    throw new Error("An unknown error occurred while suggesting prompts.");
  }
}
