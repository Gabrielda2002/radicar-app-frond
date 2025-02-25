import { CreateTicketEp } from "./CreateTIcketEp";

export const CreateTicket = async (data: FormData) => {
    try {
        
        const reponse = await CreateTicketEp(data);

        if (reponse.status === 201 || reponse.status === 200) {
            return reponse;
        }
    } catch (error) {
        console.error(error);
    }
}