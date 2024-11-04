import { Router } from 'express';
import permissionController from '../controllers/PermissionController.js';
const router = Router();


router.get('/permission/:id', permissionController.findPermissionById);
router.get('/permission', permissionController.allPermissions);
router.post('/permission', permissionController.createPermission);
router.put('/permission', permissionController.updatePermission);
router.delete('/permission/:id', permissionController.deletePermission);

export default router;