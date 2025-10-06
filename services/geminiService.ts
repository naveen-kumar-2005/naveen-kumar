import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const productSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "The full, descriptive name of the product.",
    },
    price: {
      type: Type.NUMBER,
      description: "The price of the product in Indian Rupees (INR), without the currency symbol.",
    },
    rating: {
      type: Type.NUMBER,
      description: "The customer rating of the product, on a scale from 1 to 5. Can be a decimal.",
    },
    source: {
      type: Type.STRING,
      description: "The e-commerce website where this product is listed. Should be a popular Indian e-commerce site like 'Amazon' or 'Flipkart'.",
    },
    imageUrl: {
      type: Type.STRING,
      description: "A placeholder image URL for the product. Use `https://picsum.photos/seed/{RANDOM_WORD}/400/300`."
    }
  },
  required: ["title", "price", "rating", "source", "imageUrl"],
};

export const fetchProductData = async (keyword: string): Promise<Product[]> => {
  const prompt = `Simulate scraping product information for the keyword "${keyword}" from popular Indian e-commerce sites. Generate a list of 12 realistic but fictional products with prices in Indian Rupees (INR). Ensure the products are relevant to the Indian market and include a mix of different brands and price points.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: productSchema,
        },
      },
    });

    const jsonText = response.text.trim();
    const products = JSON.parse(jsonText);
    
    // Ensure rating is within 1-5 range and price is reasonable
    return products.map((p: Product) => ({
      ...p,
      price: Math.max(0, p.price),
      rating: Math.max(1, Math.min(5, p.rating)),
    }));

  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    throw new Error("Failed to generate product data.");
  }
};