import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

// Guardar ubicación del bus
router.post("/", async (req, res) => {
  const { bus_id, latitud, longitud } = req.body;
  const { data, error } = await supabase
    .from("ubicaciones")
    .insert([{ bus_id, latitud, longitud, fecha: new Date() }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// Obtener ubicaciones recientes
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("ubicaciones")
    .select("*")
    .order("fecha", { ascending: false })
    .limit(20);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
