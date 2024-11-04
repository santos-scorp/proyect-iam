import { Router } from 'express';
import TypeAccesoController from '../controllers/TypeAccesoController.js';
const router = Router();


router.get('/typeAcceso/:id', TypeAccesoController.findTypeAccesoById);
router.get('/typeAcceso', TypeAccesoController.allTypeAccesos);
router.post('/typeAcceso', TypeAccesoController.createTypeAcceso);
router.put('/typeAcceso', TypeAccesoController.updateTypeAcceso);
router.delete('/typeAcceso/:id', TypeAccesoController.deleteTypeAcceso);

export default router;