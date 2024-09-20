import { AuditarRadicado, autorizarCups } from "../utils/api-config"

export const submitAutorizacionRadicado = async (data: any, id: number) => {

    const response = await AuditarRadicado(data, id)

    if (response.status === 200) {
        const responseAutorizacion = await autorizarCups(data, id)

        if (responseAutorizacion.status === 200) {
            return responseAutorizacion;
        }
    }

}