export interface IRequestsPermissions {
    id:               number;
    category:         string;
    granularity:      string;
    requesterId:      number;
    requesterName:    string;
    startDate:        Date;
    endDate:          Date;
    startTime:        null | string;
    endTime:          null | string;
    requestedDays:    string;
    nonRemunerated:   boolean;
    compensationTime: string;
    notes:            string;
    overallStatus:    string;
    createdAt:        Date;
    steps:            Step[];
    attachments:      Attachment[];
}

export interface Step {
    id:             number;
    order:          number;
    stepType:       string;
    approverRole:   null;
    approverUserId: number;
    approverName:   string;
    status:         string;
    comment:        null | string;
    createdAt:      Date;
}

export interface ModalActionsProps{
    permission: IRequestsPermissions;
    onSuccess?: () => void;
}

export interface Attachment {
    id:         number;
    supportId:  number;
    label:     string;
    createdAt: Date;
}