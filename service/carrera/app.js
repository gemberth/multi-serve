const express =require('express')
const cors = require('cors')

const promBundle = require('express-prom-bundle');
// const metricsMiddleware = promBundle({ includeMethod: true, includePath: true });
const { register, collectDefaultMetrics, Histogram } = require('prom-client');

const { 
    usuarioRoutes,  
    
    
    carreraRoutes
} = require('./src/routes')

const app = express();

//Directorio publico
app.use(express.static('public'));

//cors
app.use(cors())

//Lectura de body
app.use(express.json())

//RUTAS
app.use('/api/usuario', usuarioRoutes);
app.use("/api/carrera", carreraRoutes);



module.exports = app;