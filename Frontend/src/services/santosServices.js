import axios from 'axios'
import configService from './config'

const santosServices = axios.create({
  baseURL: configService.apiUrl,
})

export default santosServices
