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
    const idMunicipio = localStorage.getItem('Municipio')
    const path = folderId ? `/sistema-calidad/${folderId}` : '/sistema-calidad';
    return api.get(path, {
        params: {
            Municipio: idMunicipio
        },
    });
};


export const createFolder = async (parentFolderId: string, folderName: string) => {
    return api.post('/sistema-calidad', {parentFolderId, folderName})
}

export const uploadFile = async (formData: FormData, id: number | string) => {
    return api.post(`/archivo`, formData, {
        params: {
            parentFolderId: id, // Pasar el ID de la carpeta en los parámetros de la URL
        },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};


export const deleteItem = (id: string, type: "carpetas" | "archivo") => {
    return api.delete(`/${type}/${id}`);
};


export const downloadFile = (id: string) => {
    console.log(id)
    return api.get(`/download-file/${id}`, {
        responseType: 'blob'
    })
}