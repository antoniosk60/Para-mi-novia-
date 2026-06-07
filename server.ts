import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON body parser
app.use(express.json());

// Initialize Gemini Client
// Using lazy loading inside endpoint to handle empty keys gracefully on first load
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("La variable de entorno GEMINI_API_KEY no está configurada.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// -----------------------------------------------------------------------------
// ROMANTIC API ROUTES
// -----------------------------------------------------------------------------

// API: Cupid AI Love Letter Writer
app.post("/api/cupid/generate", async (req, res) => {
  try {
    const { mood, moodLabel } = req.body;
    
    if (!mood) {
      res.status(400).json({ error: "Falta el estado de ánimo (mood)." });
      return;
    }

    const ai = getGeminiClient();

    // Compose a highly personalized, gorgeous prompt to write a love letter for Alicia from Anto.
    const prompt = `
      Eres Cupido, el mensajero oficial del amor de Angel Antonio "Anto" (17 años) para su maravillosa novia Alicia Salas "Pichis" "Mi niñaa peshosha" (18 años).
      Ella es un año más grande que él, y su hermosa relación comenzó el 19 de junio del 2025.
      Anto quiere que le escribas una carta de amor profundamente tierna, real, sin frases genéricas robóticas, adaptada al estado de ánimo actual de Pichis.
      
      Detalles del remitente y destinatario:
      - Novio: Angel Antonio "Anto" (17 años, un novio sumamente detallista, de gran corazón, que la ama con locura).
      - Novia: Alicia Salas "Pichis" / "Mi niñaa peshosha" (18 años, hermosa, inteligente, tierna, dueña absoluta de su corazón).
      - Fecha de aniversario: 19 de junio del 2025.
      
      Estado de ánimo actual de Pichis: "${moodLabel}" (contexto de búsqueda o emoción: "${mood}").
      
      Instrucciones del tono:
      - Debe ser en Español de Latinoamérica, sumamente romántico pero sincero y afectuoso, íntimo y profundamente tierno. Usa palabras y apodos hermosos como "Pichis", "mi niña hermosa" o "mi niñaa peshosha".
      - Haz referencia a que Anto tiene 17 años y ella 18, pero que para el amor no hay edad cuando son almas gemelas desde el 19 de junio del 2025.
      - Haz referencia a que Antonio la ama por sobre todas las cosas, que está pensando en ella justo en este instante, y que este espacio interactivo está diseñado para demostrarle su amor de una manera mágica.
      - Si el estado de ánimo de ella es "cansada" o "largo día", escríbele palabras reconfortantes, de apoyo y un "abrazo de oso virtual súper fuerte de tu Anto".
      - Si es "extrañándolo", dile lo mucho que él también cuenta los segundos/minutos para volver a abrazarla y llenarla de besos.
      - Si es "feliz y enamorada", celebra su amor con alegría y dulzura, recordando lo precioso de su caminar juntos y prometiendo hacerla sonreír siempre.
      - Si es "con ganas de reír", escribe con un toque alegre, juguetón y gracioso que la haga reír.
      - Si es "consentida", llénala de mimos virtuales, caricias y palabras hermosas que la mimen como la reina hermosa de 18 años que es.
      
      Escribe una carta hermosa de aproximadamente 3 a 5 párrafos o bien un poema precioso de 4 estrofas que finalice con una firma súper tierna, como: "Tu eterno enamorado, de parte de tu niño Anto 💖" o similar.
      Formatea la salida con saltos de línea claros. No utilices formatos raros de Markdown pesados, solo saltos de línea y negritas para palabras clave sentimentales.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 1.0,
      }
    });

    const letterText = response.text || "¡No hay palabras suficientes en el universo para describir lo mucho que Anto te ama, mi Pichis! Vuelve a intentarlo, mi flecha de amor está lista.";
    
    res.json({
      success: true,
      letterText: letterText.trim(),
    });

  } catch (error: any) {
    console.error("Error generating letter:", error);
    res.status(500).json({
      success: false,
      error: "No se pudo invocar a Cupido AI. Por favor, asegúrate de que la API key de Gemini esté configurada en Secrets del proyecto.",
      details: error.message,
    });
  }
});

// API: Health status check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// -----------------------------------------------------------------------------
// VITE DEV SERVER OR STATIC PRODUCTION BUILD MIDDELWARES
// -----------------------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted in Development mode.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static assets from dist folder in Production mode.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Cupido Server] Corriendo en http://localhost:${PORT}`);
  });
}

startServer();
