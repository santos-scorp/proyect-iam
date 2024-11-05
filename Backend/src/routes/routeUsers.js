import { Router } from 'express';
import userController from '../controllers/UserController.js';
import validateUser from '../middleware/validators/userValidate.js';
import upload from '../libs/storage.js';
import validateToken from '../middleware/security/jsonWebToken.js'
import { register } from '../middleware/register.js';
const router = Router();

router.get('/user/:id', validateToken.verifyToken, userController.findUserById);
router.get('/user/code/:code', userController.findUserByCode);
router.get('/user/check/:code', userController.checkCode);
router.get('/user', validateToken.verifyToken, userController.allUsers);
router.post('/user', register, validateToken.verifyToken, validateUser.userCheck() ,userController.createUser);
router.put('/user/:id', register, validateToken.verifyToken, userController.updateUser);
router.delete('/user/:id', validateToken.verifyToken, userController.deleteUser);
router.post('/user/resetPassword',validateToken.verifyToken, validateUser.passwordCheck(), userController.changePassword);
router.post('/user/profile/:code', upload.single('profile'), userController.uploadProfile);
router.post('/user/login', validateUser.loginCheck(), userController.loginUser);
export default router;

