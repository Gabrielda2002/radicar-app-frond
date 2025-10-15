export interface MyRequestsPermissionsProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface UseFetchMyRequestsReturn {
    data: IMyRequestsPermissions[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export interface IMyRequestsPermissions {
    id:                  number;
    category:            string;
    granularity:         string;
    requesterId:         number;
    startDate:           Date;
    endDate:             Date;
    startTime:           null | string;
    endTime:             null | string;
    requestedDays:       string;
    nonRemunerated:      boolean;
    compensationTime:    string;
    notes:               string;
    overallStatus:       string;
    createdAt:           Date;
    updatedAt:           Date;
    stepsRelation:       StepsRelation[];
    attachmentsRelation: AttachmentsRelation[];
    requesterRelation:   RequesterRelation;
}

export interface AttachmentsRelation {
    id:         number;
    requestId:  number;
    supportId:  number;
    label:      string;
    uploadedBy: number;
    createdAt:  Date;
}

export interface RequesterRelation {
    id:                number;
    dniNumber:         number;
    name:              string;
    lastName:          string;
    dniType:           number;
    email:             string;
    password:          string;
    status:            boolean;
    rol:               number;
    photo:             string;
    area:              string;
    position:          string;
    headquarters:      number;
    phoneNumber:       number;
    positionId:        number;
    contractType:      string;
    dateStartContract: Date;
    updatedAt:         Date;
    createdAt:         Date;
}

export interface StepsRelation {
    id:             number;
    requestId:      number;
    order:          number;
    stepType:       string;
    approverRole:   string | null;
    approverUserId: number | null;
    status:         string;
    comment:        null | string;
    actedAt:        Date | null;
    createdAt:      Date;
}

