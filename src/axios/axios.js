import axios from 'axios'

export default axios.create({
  baseURL: 'http://sdo.oksei.ru/api'
})