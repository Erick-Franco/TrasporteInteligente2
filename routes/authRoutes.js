import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Usuario registrado correctamente", data });
});

// Login de usuario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.json({ message: "Inicio de sesión exitoso", data });
});

export default router;
