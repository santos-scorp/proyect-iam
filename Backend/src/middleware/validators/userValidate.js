import { body } from 'express-validator'

const userCheck = () => {
    console.log(body);
    
    return [
        body('name').trim().not().isEmpty().withMessage('Escribe tus nombres'),
        body('lastName').trim().not().isEmpty().withMessage('Escribe tus apellidos'),
        body('idRol' ).isInt().withMessage('Selecciona un Rol'),
        body('code').trim().not().isEmpty().withMessage('El codigo es Invalido'),
        body('password').trim().not().isEmpty().withMessage('Escribe tu contraseña'),
        body('confirmPassword').trim().custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas no coinciden').not().isEmpty().withMessage('Confirma tu contraseña')
    ]
}

const passwordCheck = () => {
    console.log(body);
    
    return [
        body('password').trim().not().isEmpty().withMessage('Escribe tu contraseña'),
        body('confirmPassword').trim().custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas no coinciden').not().isEmpty().withMessage('Confirma tu contraseña')
    ]
}

const loginCheck = () => {
    console.log(body);
    
    return [
        body('code').trim().not().isEmpty().withMessage('Escribe el codigo'),
        body('password').trim().not().isEmpty().withMessage('Escribe tu contraseña')
    ]
}

export default {userCheck, passwordCheck, loginCheck}