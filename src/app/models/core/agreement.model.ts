import { Time } from "@angular/common";

export interface AgreementModel {
    id: string;
    dayTerm: number;
    endedAt?: Time;
    endedReason: string;
    internalNumber: number;
    isFinancing: boolean;
    isFinishDate: boolean;
    monthTerm: number;
    name: string;
    number: string;
    objective: string;
    originId: string;
    startedAt?: Time;
    subscribedAt?: Time;
    typeId: string;
    userId: string;
    yearTerm: number;
}