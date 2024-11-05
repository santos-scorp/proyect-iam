import santosServices from "./santosServices";
const usersService = {}
import { TokenService } from "./tokenService";


const options = {
    headers: {
        'Authorization': 'Bearer ' + TokenService.get(),
        'Content-Type': 'application/json', // Default header for methods with body (patch, post & put)
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
     }
}


usersService.login = async (user) => {
    return await santosServices.post('/user/login', user, {
        headers: {
            'Content-Type': 'application/json', // Default header for methods with body (patch, post & put)
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
            }
    }).then(res => res.data)

}
usersService.all = async () => {    
    return await santosServices.get('/user', options)
    .then(res => res.data)
}

usersService.findById = async (id) => {
    return await santosServices.post(`/user/${id}`, options)
    .then(res => res.data)
}

usersService.insert = async (user) => {
    return await santosServices.post('/user',user,options).then(res => res.data)
}

usersService.update = async (user) => {
    return await santosServices.put(`/user/${user.id}`,user, options).then(res => res.data)
}

usersService.delete = async (user) => {
    return await santosServices.delete(`/user/${user.id}`, options)
    .then(res => res.data)
}

usersService.checkCodeSite = async (code) => {
    return await santosServices.get(`/user/checkSite/${code}`, options)
    .then(res => res.data)
}

usersService.checkCodeDoor = async (code) => {
    return await santosServices.get(`/user/checkDoor/${code}`, options)
    .then(res => res.data)
}

usersService.uploadProfile = async (file, code) => {
    console.log(file);
    
    const formData = new FormData();  
    const name = `${code}-${Date.now()}${ext(file.type)}`
    console.log(ext(file))
    formData.append('profile', file, name);
    return await santosServices.post(`/user/profile/${code}`, formData, {
        headers: {
            'Authorization': 'Bearer ' + TokenService.get(),
            'Content-Type': 'application/json', // Default header for methods with body (patch, post & put)
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
         }
    })
    .then(res => res)

}

usersService.resetPassword = async (reset) => {
    return await santosServices.post('/user/resetPassword', reset, options)
        .then(res => res.data)
}

const ext = (ext) => {
    console.log(ext);
    
    switch (ext) {
        case "image/jpg":
            return ".jpg";
        case "image/jpeg:":
            return  ".jpeg";
        case "image/png":
            return  ".png";
        case "image/gif":
            return  ".gif";
        default:
            return  ".jpg";
    }
}

export default usersService