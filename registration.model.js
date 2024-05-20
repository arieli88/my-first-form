import { Schema, model, connect } from 'mongoose';

const addressSchema = new Schema({
    city: { type: String , required: true },
    neighbored: { type: String , required: true },
    street: { type: String , required: true },
    houseNumber: { type: String , required: true },
    
})

const participantsSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
});

const registrationSchema = new Schema({
    beenThisYear: { type: Boolean, required: true },
    periodSelected: { type: String, enum: ['first', 'second'] },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: addressSchema, required: true },
    participants: [participantsSchema],
});

export default model('Registration', registrationSchema);
