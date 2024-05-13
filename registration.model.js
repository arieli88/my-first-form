import { Schema, model, connect } from 'mongoose';


const participantsSchema = new Schema({
    name: String,
    phone: String
});

const registrationSchema = new Schema({
    name: String,
    phone: String,
    address: String,
    // participants: [participantsSchema],
    participants: {},
    vacation: String
});

export default model('Registration', registrationSchema);
