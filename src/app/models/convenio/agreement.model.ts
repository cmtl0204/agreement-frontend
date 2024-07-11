export interface Agreement {
    id: string;
    number: string;
    internalNumber: number;
    name: string;
    originId: string;
    typeId: string;
    subscribedAt: string; // Adjust to appropriate date/time type if necessary
    startedAt: string; // Adjust to appropriate date/time type if necessary
    isFinishDate: boolean;
    endedAt: string; // Adjust to appropriate date/time type if necessary
    endedReason: string;
    yearTerm: number;
    monthTerm: number;
    dayTerm: number;
    objective: string;
    isFinancing: boolean;
    closeTypeId: string;
    closedAt: string; // Adjust to appropriate date/time type if necessary
    closeDetail: string;
    closed: boolean;
  }