import mongoose, {Schema} from 'mongoose'

mongoose.connect(process.env.MONGODB_URI!)
mongoose.Promise = global.Promise

const patientSchema = new Schema({
  message: String
})

const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema)
export default Patient