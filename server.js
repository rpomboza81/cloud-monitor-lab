const express = require("express");
const os = require("os");
const app = express();

const PORT = process.env.PORT || 3000;
const MENSAJE = process.env.MENSAJE_NUBE || "Despliegue Automatizado v2.0";
const MODO_MANTENIMIENTO = process.env.MODO_MANTENIMIENTO || "false";

// Ruta principal
app.get("/", (req, res) => {
  console.log(`[${new Date().toISOString()}] Petición recibida en / desde ${req.ip}`);
  if (MODO_MANTENIMIENTO === "true") {
    return res.status(503).send("<h1>503 - Servicio en Mantenimiento Programado</h1>");
  }
  res.send(`
    <div style="font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
      <h1 style="color: #0066B2;">Computación en la Nube - Taller Práctico</h1>
      <p><strong>Estado:</strong> ${MENSAJE}</p>
      <p><strong>Contenedor / Host:</strong> ${os.hostname()}</p>
      <p><strong>Hora del Servidor (UTC):</strong> ${new Date().toISOString()}</p>
    </div>
  `);
});

// Ruta de verificación de salud (Health Check)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    uptime_seconds: Math.floor(process.uptime()),
    memory_rss_mb: Math.round(process.memoryUsage().rss / 1024 / 1024),
    timestamp: new Date().toISOString()
  });
});

// Ruta simulada de carga de CPU (para pruebas de monitoreo)
app.get("/carga", (req, res) => {
  console.warn(`[${new Date().toISOString()}] Ejecutando prueba intensiva de CPU...`);
  const fin = Date.now() + 2500;
  while (Date.now() < fin) { Math.sqrt(Math.random()); }
  res.send("Cálculo intensivo finalizado correctamente.");
});

app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
