import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path'
import routeUsers from './routes/routeUsers.js'
import routesPermissions from './routes/routesPermissions.js'
import routesRegisters from './routes/routesRegisters.js'
import routesRolPermissions from './routes/routesRolPermissions.js'
import routesRoles from './routes/routesRoles.js'
import routesTypeAcceso from './routes/routesTypeAcceso.js'


const __dirname = import.meta.dirname;
const app = express()

app.use(json());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
// Configura CORS para permitir cualquier origen
app.use(cors({
    origin: '*', // Permite cualquier origen
    methods: 'GET, POST, PUT, DELETE',
}));



app.use('/api', routeUsers)
app.use('/api', routesPermissions)
app.use('/api', routesRegisters)
app.use('/api', routesRolPermissions)
app.use('/api', routesRoles)
app.use('/api', routesTypeAcceso)
app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.send('Hello World!')
})


export default app;