import Permission from "../models/permissionModel.js";

const findPermissionById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Permission.findPermissionById(id)
        return res.status(200).json({
            Permission: result
        })
    } catch (error) {
        res.status(500).json({error: 'Error to show Permission'}) 
    }
}
const allPermissions = async (req, res) => {
    
    try {
        const result = await Permission.allpermissions()
        console.log(result)
        res.status(200).json({
            Permission: result
        }) 
    } catch (error) {
        res.status(500).json({error: 'Error to show list Permissions'})
    }
}
const createPermission = async (req,res) => {
    const { name } = req.body
    const permission = { name }

    try {
        const result = await Permission.insertPermission(permission)
        console.log(result)
        if (!result) {
            res.status(201).json({
                messaje: "Permission Created Successfully",
                Permission: result
            })
        }
    } catch (error) {
        res.status(500).json({error: 'Error to create Permission'})
    }
}
const updatePermission = async (req,res) => {
    const { id, name } = req.body
    const permission = { id, name }

    try {
        const result = await Permission.editPermission(permission)
        if (!result) {
            res.status(201).json({
                messaje: "Permission Updated Successfully",
                Permission: result
            })
        }
    } catch (error) {
        res.status(500).json({error: 'Error to update Permission'})
    }
}
const deletePermission = async (req,res) => {
    const id = req.params.id

    try {
        const result = await Permission.removePermission(id)
        if(!result){
            res.status(201).json({
                messaje: "Permission Deleted Successfully",
                Permission: result
            }) 
        }
    } catch (error) {
        res.status(500).json({error: 'Error to delete Permission'})
    }
}

export default {
    findPermissionById,
    allPermissions,
    createPermission,
    updatePermission,
    deletePermission
}
