import { Router } from 'express';
import { loginUsuario, registrarUsuario } from '../controllers/usuario.controller';

const router = Router();

// Ruta para registrar usuario
router.post('/registrar', registrarUsuario);

// Ruta para login
router.get('/login', loginUsuario  );

export default router;
