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

export const getFolderContent = async (folderId?: string) => {
    const path = folderId ? `/sistema-calidad/${folderId}` : '/sistema-calidad';
    console.log(path)
    return api.get(path);
};


export const createFolder = async (parentFolderId: string, folderName: string) => {
    return api.post('/sistema-calidad', {parentFolderId, folderName})
}

export const uploadFile = async (folderId: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    return api.post(`/archivo/${folderId}/archivos`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteItem = (id: string, type: "carpetas" | "archivo") => {
    return api.delete(`/${type}/${id}`);
};


export const downloadFile = (id: string) => {
    return api.get(`/archivo/${id}/descargar`, {
        responseType: 'blob'
    })
}