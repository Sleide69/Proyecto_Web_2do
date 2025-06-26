import { Router } from 'express';
import { crearCaptura } from '../controllers/captura.controller';

const router = Router();

router.post('/', crearCaptura); // POST /api/capturas/

export default router;
