import { IComment } from "@/models/IComment";
import { api } from "@/utils/api-config";

export const getCommentsTicket = async (id: number): Promise<IComment[]> => {
    const response = await api.get(`/comment/tickets/${id}`)

    const data = response.data.map((comment: IComment) => ({
        ...comment,
        createdAt: new Date(comment.createdAt),
    }));

    return data;
}