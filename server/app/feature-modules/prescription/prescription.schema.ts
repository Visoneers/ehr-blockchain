import mongoose, { Types } from "mongoose";
import { BaseSchema } from "../../utils/baseschema";

const PrescriptionSchema = new BaseSchema({
  userId: {
    type: Types.ObjectId,
    
  },
  doctorId: {
    type: Types.ObjectId,
    
  },
  diseases: String,
  data: [
    new mongoose.Schema(
      {
        name: String,
        type: String,
        days: Number,
        instruction: String
      }
    )
  ],
});

export const PrescriptionModel = mongoose.model('Prescription', PrescriptionSchema);


