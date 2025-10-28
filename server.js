import express from 'express'
import dotenv from 'dotenv'
import busesRoutes from './routes/busesRoutes.js'
import conductoresRoutes from './routes/conductoresRoutes.js'
import rutasRoutes from './routes/rutasRoutes.js'
import ubicacionesRoutes from './routes/ubicacionesRoutes.js'
import usuariosRoutes from './routes/usuariosRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Transporte Inteligente',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      buses: '/api/buses',
      conductores: '/api/conductores',
      rutas: '/api/rutas',
      ubicaciones: '/api/ubicaciones',
      usuarios: '/api/usuarios'
    }
  })
})

app.use('/api/buses', busesRoutes)
app.use('/api/conductores', conductoresRoutes)
app.use('/api/rutas', rutasRoutes)
app.use('/api/ubicaciones', ubicacionesRoutes)
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
