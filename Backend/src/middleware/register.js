
import registerModel from "../models/registerModel.js";


export const register = async (req, res, next) => {
    console.log(req.body, "body")
    const {idUser, idAcceso} = req.body
    try {
        await registerModel.insertRegister(idUser, idAcceso)
        .then(res => console.log(res))
    } catch (error) {
        console.log(error);        
    }
    next()
}