import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

// Listar conductores
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("conductores").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Registrar conductor
router.post("/", async (req, res) => {
  const { usuario, correo, placa, linea } = req.body;
  const { data, error } = await supabase
    .from("conductores")
    .insert([{ usuario, correo, placa, linea }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

export default router;
