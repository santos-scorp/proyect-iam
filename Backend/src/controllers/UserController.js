import userModel from "../models/userModel.js";
import User from "../models/userModel.js";
import registerModel from "../models/registerModel.js"
import Permissions from "../models/rolPermissionModel.js";
import { validationResult } from 'express-validator'
import jwt from "jsonwebtoken"
const secretKey = process.env.SECRET_KEY

const loginUser = async (req, res) => {
    const {code, password} = req.body
    const user = {code, password}
    let errors = validationResult(req) ;
    console.log(errors);
     
    if ( !errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    
    try {
        // const existUser = await User.findUserByCode(code)     
        const result = await User.login(user)
        console.log(result)
        const permissions = await Permissions.findRolPermissionsById(result.idRol)
        const listPermission = permissions.map(element => element.idPermission);
        result.permissions = listPermission  
        await registerModel.insertRegister(result.id, 4)
        const token = jwt.sign(result, secretKey, {expiresIn: "1h"} )
        return res.status(200).json({
            user: result,
            token
        })
    } catch (error) { 
        console.log(error)
        res.status(400).json({error: 'User not Found'})
    }

}
const findUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await User.findUserById(id)
        return res.status(200).json({
            user: result
        })
    } catch (error) {
        res.status(500).json({error: 'Error to show user'}) 
    }
}
const findUserByCode = async (req, res) => {
    const {code} = req.params;
    console.log(code);
    try {
        const result = await User.findUserByCode(code)
        const permissions = await Permissions.findRolPermissionsById(result.idRol)
        const listPermission = permissions.map(element => element.idPermission);
        result.permissions = listPermission
        res.status(200).json({
            user: result,            
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error: 'Error to show user'}) 
    }
}

const allUsers = async (req, res) => {
    
    try {
        const result = await User.allUsers()
        console.log(result)
        res.status(200).json({
            users: result
        }) 
    } catch (error) {
        res.status(500).json({error: 'Error to show list users'})
    }
}

const createUser = async (req, res) => {
    const { name, lastName, code, password, idRol, permissions } = req.body
    const user = { name, lastName, idRol, code, password,  permissions }
    let errors = validationResult(req) ; 
    if ( !errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    try {
        const result = await User.insertUser(user)
        if (!result) {
            res.status(201).json({
                messaje: "User Created Successfully",
                user: result
            })
        }
    } catch (error) {
        res.status(500).json({error: 'Error to create user'})
    }
}

const updateUser = async (req,res) => {
    const { name, lastName, idRol } = req.body
    let id = req.params.id
    const user = {id, name, lastName, idRol }
    console.log(user)

    try {
        const result = await User.editUser(user)
        console.log(result)
        if (!result) {
            res.status(201).json({
                messaje: "User Updated Successfully",
                user: result
            })
        }
    } catch (error) {
        res.status(500).json({error: 'Error to update user'})
    }
}

const deleteUser = async (req,res) => {
    const id = req.params.id

    try {
        const result = await User.removeUser(id)
        if(!result){
            res.status(201).json({
                messaje: "User Deleted Successfully",
                user: result
            }) 
        }
    } catch (error) {
        res.status(500).json({error: 'Error to delete user'})
    }
}
const changePassword = async (req,res) => {
    const password = req.body
    console.log(password);
    
    let errors = validationResult(req) ; 
    if ( !errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    try {
        const result = await User.resetPassword(password)
        if(!result){
            res.status(201).json({
                messaje: "Password Changed Successfully",
                user: result
            }) 
        }
    } catch (error) {
        res.status(500).json({error: 'Error to delete user'})
    }
}

const uploadProfile = async (req, res,next) => {
    const {code} = req.params;    
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    } else {
        try {
            const user = await userModel.findUserByCode(code).then(res => res)
            console.log(req.file.originalname);
            const result = userModel.updatePhoto(user.id, req.file.originalname)
            res.status(200).json({message: "Foto de Perfil Actualizada"})
        } catch (error) {
            res.status(400).json({error: "No su actualizo la foto de perfil"})
        }

        
    }
}

const checkCodeSite = async (req, res) => {
    const {code} = req.params;
    console.log(code);
    try {
        const result = await User.findUserByCode(code)
        const permissions = await Permissions.findRolPermissionsById(result.idRol)
        const listPermission = permissions.map(element => element.idPermission);
        result.permissions = listPermission
        await registerModel.insertRegister(result.id, 2)
        res.status(200).json({
            user: result,            
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error: 'Error to show user'}) 
    }
}

const checkCodeDoor = async (req, res) => {
    const {code} = req.params;
    console.log(code);
    try {
        const result = await User.findUserByCode(code)
        const permissions = await Permissions.findRolPermissionsById(result.idRol)
        const listPermission = permissions.map(element => element.idPermission);
        result.permissions = listPermission
        await registerModel.insertRegister(result.id, 3)
        res.status(200).json({
            user: result,            
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error: 'Error to show user'}) 
    }
}

export default {
    checkCodeSite,
    checkCodeDoor,
    loginUser,
    findUserById,
    findUserByCode,
    allUsers,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    uploadProfile
}

