import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

// Listar rutas
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("rutas").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Crear ruta
router.post("/", async (req, res) => {
  const { nombre, linea, coordenadas_ida, coordenadas_vuelta } = req.body;
  const { data, error } = await supabase
    .from("rutas")
    .insert([{ nombre, linea, coordenadas_ida, coordenadas_vuelta }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

export default router;
