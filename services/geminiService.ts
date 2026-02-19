
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getAsteroidInterpretation(asteroidName: string, contextType: 'sign' | 'house', contextName: string) {
  try {
    const prompt = `Proporciona una interpretación astrológica detallada (máximo 100 palabras) para el asteroide ${asteroidName} cuando se encuentra en ${contextType === 'sign' ? 'el signo de' : 'la casa'} ${contextName}. Enfócate en la psicología moderna, el crecimiento personal y los desafíos espirituales. Responde en español.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "No se pudo generar la interpretación en este momento.";
  } catch (error) {
    console.error("Error fetching interpretation:", error);
    return "Ocurrió un error al consultar el oráculo cósmico.";
  }
}

export async function getPlanetaryInsight(planetName: string, targetBody: string, aspectName: string) {
  try {
    const prompt = `Explica la relación astrológica (aspecto) de ${aspectName} entre ${planetName} y ${targetBody}. ¿Cómo afecta esta dinámica a la personalidad de alguien? Sé conciso y usa un tono profesional pero accesible en español.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    return "Interacción cósmica no disponible.";
  }
}
