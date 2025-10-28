import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

// Listar usuarios
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("usuarios").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Crear usuario
router.post("/", async (req, res) => {
  const { nombre, correo, rol } = req.body;
  const { data, error } = await supabase
    .from("usuarios")
    .insert([{ nombre, correo, rol }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

export default router;
