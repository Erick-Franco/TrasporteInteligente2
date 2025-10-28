// controllers/conductoresController.js
import { pool } from '../config/db.js';

export const crearConductor = async (req, res) => {
  try {
    const { usuario, correo, placa, linea, esta_activo, usuario_id } = req.body;
    const result = await pool.query(
      `INSERT INTO conductores (usuario, correo, placa, linea, esta_activo, usuario_id)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [usuario, correo, placa, linea, esta_activo ?? true, usuario_id ?? null]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const listarConductores = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM conductores ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
