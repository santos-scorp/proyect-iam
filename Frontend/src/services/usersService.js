import santosServices from "./santosServices";
const usersService = {}
import { TokenService } from "./tokenService";
import axios from 'axios';


const options = {
    headers: {
        'Authorization': 'Bearer ' + TokenService.get(),
        'Content-Type': 'application/json', // Default header for methods with body (patch, post & put)
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
     }
}


usersService.login = async (user) => {
    try {
        return await santosServices.post('/user/login', user, )
        .then(res => res.data)
    } catch (error) {
        console.log(error);
        
    }
}
usersService.all = async () => {    
    return await axios.get('/user', options)
    .then(res => res.data)
}

usersService.findById = async (id) => {
    return await axios.post(`/user/${id}`, options)
    .then(res => res.data)
}

usersService.insert = async (user) => {
    return await axios.post('/user',user,options).then(res => res.data)
}

usersService.update = async (user) => {
    return await axios.put(`/user/${user.id}`,user, options).then(res => res.data)
}

usersService.delete = async (id) => {
    return await axios.delete(`/user/${id}`, options)
    .then(res => res.data)
}

usersService.checkCode = async (code) => {
    return await axios.get(`/user/code/${code}`)
    .then(res => res.data)
}

usersService.uploadProfile = async (file, code) => {
    const formData = new FormData();  
    const name = `${code}-${Date.now()}${ext(file.type)}`
    console.log(ext(file))
    formData.append('profile', file, name);
    return await axios.post(`/user/profile/${code}`, formData, options)
    .then(res => res)

}

usersService.resetPassword = async (reset) => {
    return await axios.post('/user/resetPassword', reset, options)
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