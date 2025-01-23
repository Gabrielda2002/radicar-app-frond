import { EpUpdateGroupService } from "./EpUpdateGroupService";

export const UpdateGroupServices = async (groupService: number, id: number) => {
    try {
        
        const response = await EpUpdateGroupService(groupService, id);

        if (response.status === 200 || response.status === 201) {
            return response;
        }

    } catch (error) {
        console.log(error)
    }
}