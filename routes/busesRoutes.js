import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

// Listar buses
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("buses").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Crear bus
router.post("/", async (req, res) => {
  const { placa, ruta_id, latitud, longitud, sentido } = req.body;
  const { data, error } = await supabase
    .from("buses")
    .insert([{ placa, ruta_id, latitud, longitud, sentido }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

export default router;
