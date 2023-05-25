export interface IPrescription {
    _id: string;
    patientId: string;
    doctorId: string;
    diseases:string;
    data:[{name:string ,
    type:string,
    days:number,
    instruction:string}]
  }
