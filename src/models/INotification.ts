export interface INotification {
    id: number;
    userId: number;
    title: string;
    message: string;
    referenceId?: number;
    referenceType?: string;
    isRead: boolean;
    createdAt: Date;
}