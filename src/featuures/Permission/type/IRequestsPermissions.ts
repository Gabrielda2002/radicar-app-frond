export type IRequestsPermissions = {
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
}
