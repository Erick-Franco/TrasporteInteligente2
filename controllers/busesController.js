// controllers/busesController.js
import { pool } from '../config/db.js';

export const crearBus = async (req, res) => {
  try {
    const { placa, ruta_id, latitud, longitud, sentido } = req.body;
    const result = await pool.query(
      `INSERT INTO buses (placa, ruta_id, latitud, longitud, sentido)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [placa, ruta_id, latitud ?? null, longitud ?? null, sentido ?? null]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listarBuses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM buses ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// actualizar ubicación simple (y opcionalmente guardar historial)
export const actualizarUbicacionBus = async (req, res) => {
  try {
    const { id } = req.params;
    const { latitud, longitud, sentido } = req.body;

    await pool.query('UPDATE buses SET latitud=$1, longitud=$2, sentido=$3 WHERE id=$4', [latitud, longitud, sentido, id]);

    // guardar historial
    await pool.query('INSERT INTO ubicaciones (bus_id, latitud, longitud) VALUES ($1,$2,$3)', [id, latitud, longitud]);

    res.json({ mensaje: 'Ubicación del bus actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
