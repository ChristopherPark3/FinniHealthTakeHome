import mongoose, {Schema} from 'mongoose'

mongoose.connect(process.env.MONGODB_URI!)
mongoose.Promise = global.Promise

const patientSchema = new Schema({
  firstName: {type: String, required: true},
  middleName: String,
  lastName: {type: String, required: true},
  status: {type: String, required: true},
  address: {type: String, required: true},
})

const Patient = mongoose.models.Patient ?? mongoose.model("Patient", patientSchema)
export default Patient