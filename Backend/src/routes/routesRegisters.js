import { Router } from 'express';
import RegisterController from '../controllers/RegisterControler.js';
const router = Router();


router.get('/register/:id', RegisterController.findRegisterById);
router.get('/register', RegisterController.allRegisters);
router.post('/register', RegisterController.createRegister);
router.put('/register', RegisterController.updateRegister);
router.delete('/register/:id', RegisterController.deleteRegister);

export default router;