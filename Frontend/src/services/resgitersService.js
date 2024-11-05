import santosServices from "./santosServices";
import { TokenService } from "./tokenService";

const registersService = {}

const options = {
    headers: {
        'Authorization': 'Bearer ' + TokenService.get(),
        'Content-Type': 'application/json', // Default header for methods with body (patch, post & put)
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
     }
}

registersService.all = () => {
    return santosServices.get('/register', options)
    .then(res => res.data)
}
registersService.insert = (register) => {
    return santosServices.post('/register', {
        params: register
    }).then(res => res.data)
}

registersService.update = (register) => {
    return santosServices.put(`/register/${register.id}`, {
        params: register
    }).then(res => res.data)
}

registersService.delete = (id) => {
    return santosServices.delete(`/register/${id}`)
    .then(res => res.data)
}

export default registersService