// controllers/ubicacionesController.js
import { pool } from '../config/db.js';

// Endpoint que registraría la ubicación en tabla 'ubicaciones' (historial) y opcionalmente actualiza buses
export const registrarUbicacion = async (req, res) => {
  try {
    const { bus_id, latitud, longitud, conductor_id } = req.body;
    if (!bus_id || latitud == null || longitud == null) return res.status(400).json({ error: 'Datos incompletos' });

    await pool.query('INSERT INTO ubicaciones (bus_id, latitud, longitud) VALUES ($1,$2,$3)', [bus_id, latitud, longitud]);
    // Actualizar tabla buses para mostrar posición actual:
    await pool.query('UPDATE buses SET latitud=$1, longitud=$2 WHERE id=$3', [latitud, longitud, bus_id]);

    res.json({ mensaje: 'Ubicación registrada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const historialBus = async (req, res) => {
  try {
    const { bus_id } = req.params;
    const result = await pool.query('SELECT * FROM ubicaciones WHERE bus_id=$1 ORDER BY fecha_hora DESC LIMIT 200', [bus_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
