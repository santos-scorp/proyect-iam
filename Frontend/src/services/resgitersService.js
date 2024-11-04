import santosServices from "./santosServices";

const registersService = {}

registersService.all = () => {
    return santosServices.get('/register')
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