import axios from 'axios'

const client = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000
})

client.interceptors.request.use(
  config => {
    console.log('PokeAPI Request: ', config)

    return config
  },
  error => {
    console.log('PokeAPI Request Error: ', error)
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  response => {
    console.log('PokeAPI Response: ', response.data)
    return response
  },
  error => {
    console.log('PokeAPI Response Error: ', error)
    return Promise.reject(error)
  }
)

export default client
