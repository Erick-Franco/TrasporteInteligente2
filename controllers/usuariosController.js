import { pool } from '../config/db.js';

export const registrarUsuario = async (req, res) => {
  try {
    const { nombres, apellidos, correo, contrasena, telefono, rol_id } = req.body;
    const result = await pool.query(
      `INSERT INTO usuarios (nombres, apellidos, correo, contrasena, telefono, rol_id)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [nombres, apellidos, correo, contrasena, telefono, rol_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
