import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
const app = express();
import { router as tabRoutes } from './server/routes/tab_routes.js';

// URL Connexion
const MONGODB_URI = 'mongodb+srv://Pablo:pablo02@cluster0.vve9mwe.mongodb.net/test'

mongoose.set({strictQuery: true});

mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Te has conectado a la base de datos :)')
}).catch(error => {
    console.log(`No te has podido conectar por el siguiente error ${error}`);
})

const defaultPort = 3005;

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type");
  
    next();
  
  });

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para los tablones
app.use('/api/tabs', tabRoutes);

// Middleware para las tareas
app.use('/api/task');

app.get("/", (req,res) => {
    res.send('Inicia el Frontal de la aplicación con la extensión de "Live Server", este es el puerto en el que se aloja el servidor.')
});

app.listen(defaultPort, (req,res) => {
    console.log(`http://localhost:${defaultPort}/`)
});