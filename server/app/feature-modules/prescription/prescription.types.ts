export interface IPrescription {
    _id: string;
    patientId: string;
    doctorId: string;
    diseases:string;
    medicines: Medicine[];
  }
  
  interface Medicine {
    name: string;
    dosage: Dosage[];
  }
  
  interface Dosage {
    time: time;
    amount: string;
  }
  type time="morning"|"afternoon"|"night"