import axios from 'axios'

const token = localStorage.getItem('token')

export const api = axios.create({
    baseURL: 'http://localhost:3600/api/v1',

    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }else if(rol){
            config.headers['Authorization'] = `Bearer ${rol}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

