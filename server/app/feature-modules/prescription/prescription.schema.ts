import mongoose from "mongoose";
import { BaseSchema } from "../../utils/baseschema";


const DosageSchema = new mongoose.Schema({
  time: String,
  amount: String
});

const MedicineSchema = new mongoose.Schema({
  name: String,
  dosage: [DosageSchema]
});

const PrescriptionSchema = new BaseSchema({
  patientId: String,
  doctorId: String,
  diseases:String,
  medicines: [MedicineSchema],
});

export const PrescriptionModel = mongoose.model('Prescription', PrescriptionSchema);


