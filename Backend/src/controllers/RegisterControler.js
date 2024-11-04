import Register from "../models/registerModel.js";

const findRegisterById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Register.findRegisterById(id)
        return res.status(200).json({
            Register: result
        })
    } catch (error) {
        res.status(500).json({error: 'Error to show Register'}) 
    }
}
const allRegisters = async (req, res) => {
    
    try {
        const result = await Register.allRegisters()
        console.log(result)
        res.status(200).json({
            Registers: result
        }) 
    } catch (error) {
        res.status(500).json({error: 'Error to show list Registers'})
    }
}
const createRegister = async (req,res) => {
    const { name } = req.body
    const Register = { name }

    try {
        const result = await Register.insertRegister(Register)
        console.log(result)
        if (!result) {
            res.status(201).json({
                messaje: "Register Created Successfully",
                Register: result
            })
        }
    } catch (error) {
        res.status(500).json({error: 'Error to create Register'})
    }
}
const updateRegister = async (req,res) => {
    const { id, name } = req.body
    const Register = { id, name }

    try {
        const result = await Register.editRegister(Register)
        if (!result) {
            res.status(201).json({
                messaje: "Register Updated Successfully",
                Register: result
            })
        }
    } catch (error) {
        res.status(500).json({error: 'Error to update Register'})
    }
}
const deleteRegister = async (req,res) => {
    const id = req.params.id

    try {
        const result = await Register.removeRegister(id)
        if(!result){
            res.status(201).json({
                messaje: "Register Deleted Successfully",
                Register: result
            }) 
        }
    } catch (error) {
        res.status(500).json({error: 'Error to delete Register'})
    }
}

export default {
    findRegisterById,
    allRegisters,
    createRegister,
    updateRegister,
    deleteRegister
}
