import { Router } from 'express';
import rolController from '../controllers/RolController.js';
const router = Router();


router.get('/rol/:id', rolController.findRolById);
router.get('/rol', rolController.allRoles);
router.post('/rol', rolController.createRol);
router.put('/rol', rolController.updateRol);
router.delete('/rol/:id', rolController.deleteRol);

export default router;