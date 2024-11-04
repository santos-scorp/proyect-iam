import Rol from "../models/rolModel.js";
import rolPermissionModel from "../models/rolPermissionModel.js";

import insertRolPermission from '../models/rolPermissionModel.js'

const findRolById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Rol.finRolById(id)
        return res.status(200).json({
            rol: result
        })
    } catch (error) {
        res.status(500).json({error: 'Error to show rol'}) 
    }
}

const allRoles = async (req, res) => {    
    try {
        const result = await Rol.allRoles()
        console.log(result)
        res.status(200).json({
            roles: result
        }) 
    } catch (error) {
        res.status(500).json({error: 'Error to show list roles'})
    }
}
const createRol = async (req,res) => {
    const { name, description, permissions } = req.body
    const rol = { name, description, permissions }
    console.log(rol)

    try {
        const result = await Rol.insertRol(rol);
        console.log(result)
        if (!result) {
            const idRol = await Rol.lastIdRolInsert()
            console.log(idRol);
            if (permissions.length > 0) {
                insertPermissionsToRol(idRol.id, rol.permissions)
            }
            res.status(201).json({
                messaje: "Rol Created Successfully",
                rol: result
            })
        }
    } catch (error) {
        res.status(500).json({error: 'Error to create rol'})
    }
}

const insertPermissionsToRol = async (id, permissions) => {
    for (let index = 0; index < permissions.length; index++) {
        const el = permissions[index]; 
        try {
            rolPermissionModel.insertRolPermission(id,el)
        } catch (error) {
            console.log(error);
            
        }
               
    }
}


const updateRol = async (req,res) => {
    const { id,name, lastName, code, password, idRol } = req.body
    const rol = { id, name, lastName, code, password, idRol }
    console.log(rol)

    try {
        const result = await Rol.editRol(rol)
        console.log(result)
        if (!result) {
            res.status(201).json({
                messaje: "Rol Updated Successfully",
                rol: result
            })
        }
    } catch (error) {
        res.status(500).json({error: 'Error to update rol'})
    }
}
const deleteRol = async (req,res) => {
    const id = req.params.id

    try {
        const result = await Rol.removeRol(id)
        if(!result){
            res.status(201).json({
                messaje: "Rol Deleted Successfully",
                rol: result
            }) 
        }
    } catch (error) {
        res.status(500).json({error: 'Error to delete rol'})
    }
}


export default {
    findRolById,
    allRoles,
    createRol,
    updateRol,
    deleteRol,
}