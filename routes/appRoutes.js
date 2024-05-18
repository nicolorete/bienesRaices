import Express from "express";
import { inicio, categoria, noEncontrado, buscador } from "../controllers/appController.js"

const router = Express.Router()

// Página de Inicio
router.get('/', inicio)

// Categorias
router.get('/categorias/:id', categoria)

// Página 404 
router.get('/404', noEncontrado)

// Buscador
router.post('/buscador', buscador)

export default router
