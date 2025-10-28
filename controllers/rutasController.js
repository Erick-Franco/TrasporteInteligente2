// controllers/rutasController.js
import { pool } from '../config/db.js';

export const crearRuta = async (req, res) => {
  try {
    const { nombre, linea, coordenadas_ida, coordenadas_vuelta } = req.body;
    // coordenadas_ida/vuelta deben ser JSON (arrays de puntos {lat,lng})
    const result = await pool.query(
      `INSERT INTO rutas (nombre, linea, coordenadas_ida, coordenadas_vuelta)
       VALUES ($1,$2,$3::jsonb,$4::jsonb) RETURNING *`,
      [nombre, linea, JSON.stringify(coordenadas_ida), JSON.stringify(coordenadas_vuelta)]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const listarRutas = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre, linea, coordenadas_ida, coordenadas_vuelta FROM rutas ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const obtenerRuta = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT id, nombre, linea, coordenadas_ida, coordenadas_vuelta FROM rutas WHERE id=$1', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Ruta no encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
