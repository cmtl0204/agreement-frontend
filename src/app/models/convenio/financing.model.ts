import { Agreement } from "./agreement.model";
export interface Financing {
    id: string;
    modelId: string;
    budget: number;
    paymentMethod: string;
    source: string;
    

    agreement:Agreement
    agreementId: string;
  }