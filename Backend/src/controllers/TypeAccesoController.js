import TypeAcceso from "../models/typeAccesoModel.js";

const findTypeAccesoById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await TypeAcceso.findTypeAccesoById(id)
        return res.status(200).json({
            TypeAcceso: result
        })
    } catch (error) {
        res.status(500).json({error: 'Error to show TypeAcceso'}) 
    }
}
const allTypeAccesos = async (req, res) => {
    
    try {
        const result = await TypeAcceso.allTypeAccesos()
        console.log(result)
        res.status(200).json({
            TypeAccesos: result
        }) 
    } catch (error) {
        res.status(500).json({error: 'Error to show list TypeAccesos'})
    }
}
const createTypeAcceso = async (req,res) => {
    const { name } = req.body
    const TypeAcceso = { name }

    try {
        const result = await TypeAcceso.insertTypeAcceso(TypeAcceso)
        console.log(result)
        if (!result) {
            res.status(201).json({
                messaje: "TypeAcceso Created Successfully",
                TypeAcceso: result
            })
        }
    } catch (error) {
        res.status(500).json({error: 'Error to create TypeAcceso'})
    }
}
const updateTypeAcceso = async (req,res) => {
    const { id, name } = req.body
    const TypeAcceso = { id, name }

    try {
        const result = await TypeAcceso.editTypeAcceso(TypeAcceso)
        if (!result) {
            res.status(201).json({
                messaje: "TypeAcceso Updated Successfully",
                TypeAcceso: result
            })
        }
    } catch (error) {
        res.status(500).json({error: 'Error to update TypeAcceso'})
    }
}
const deleteTypeAcceso = async (req,res) => {
    const id = req.params.id

    try {
        const result = await TypeAcceso.removeTypeAcceso(id)
        if(!result){
            res.status(201).json({
                messaje: "TypeAcceso Deleted Successfully",
                TypeAcceso: result
            }) 
        }
    } catch (error) {
        res.status(500).json({error: 'Error to delete TypeAcceso'})
    }
}

export default {
    findTypeAccesoById,
    allTypeAccesos,
    createTypeAcceso,
    updateTypeAcceso,
    deleteTypeAcceso
}
