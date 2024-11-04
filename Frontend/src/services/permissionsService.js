import santosServices from "./santosServices";

const permissionsService = {}

permissionsService.all = async () => {
    return await santosServices.get('/permission')
    .then(res =>res.data)
}
permissionsService.insert = (permission) => {
    return santosServices.post('/permission', {
        params: permission
    }).then(res => res.data)
}

permissionsService.update = async (permission) => {
    return await santosServices.put(`/permission/${permission.id}`, {
        params: permission
    }).then(res => res.data)
}

permissionsService.delete = (id) => {
    return santosServices.delete(`/permission/${id}`)
    .then(res => res.data)
}

export default permissionsService