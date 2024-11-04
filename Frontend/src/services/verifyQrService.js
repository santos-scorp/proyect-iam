import santosServices from './santosServices'

const qrService = {}

qrService.check = (id) => {
    return santosServices.get(`/user/${code}`)
    .then(res => res.data)
}

export default qrService