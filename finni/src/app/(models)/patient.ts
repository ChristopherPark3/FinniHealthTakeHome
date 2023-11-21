import mongoose, { Schema } from "mongoose";
import { ConnectOptions } from "mongoose";

mongoose.Promise = global.Promise;

const patientSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  status: { type: String, required: true },
  address: { type: String, required: true },
  other: { type: Object, required: false },
});

const Patient =
  mongoose.models.Patient ?? mongoose.model("Patient", patientSchema);
export default Patient;
