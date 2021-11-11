import axios from 'axios'

export default axios.create({
  baseURL: 'http://sdonode.okeit.edu:8080/api'
})