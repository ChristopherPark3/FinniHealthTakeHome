import mongoose, { Schema } from "mongoose";

const MONGODB_URI = `mongodb+srv://chrispark:FinniHealth@finnicluster.xrymtmg.mongodb.net/`

async function connect() {
  const status = await mongoose.connect(MONGODB_URI);
}
mongoose.Promise = global.Promise;

const patientSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: String,
  lastName: { type: String, required: true },
  status: { type: String, required: true },
  address: { type: String, required: true },
});

const Patient =
  mongoose.models.Patient ?? mongoose.model("Patient", patientSchema);
// const Patient = new mongoose.model('patient', patientSchema)
export default Patient;
