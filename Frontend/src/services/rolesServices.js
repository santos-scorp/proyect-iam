import santosServices from "./santosServices";

const rolesServices = {}

rolesServices.all = () => {
    return santosServices.get('/rol')
    .then(res => res.data)
}

rolesServices.insert = (rol) => {
    return santosServices.post('/rol', rol, {
        headers: {
            'Content-Type': 'application/json', // Default header for methods with body (patch, post & put)
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
         }
    }).then(res => res.data)
}

rolesServices.update = (rol) => {
    return santosServices.put(`/rol/${rol.id}`, rol, {
        headers: {
            'Content-Type': 'application/json', // Default header for methods with body (patch, post & put)
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
         }
    }).then(res => res.data)
}

rolesServices.delete = (id) => {
    return santosServices.delete(`/rol/${id}`)
    .then(res => res.data)
}

export default rolesServices