import { Schema, model, connect } from 'mongoose';

const addressSchema = new Schema({
    city: { type: String , required: true },
    neighbored: { type: String , required: true },
    street: { type: String , required: true },
    houseNumber: { type: String , required: true },
    
})

const participantsSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    relationship: { type: String, required: true },
    phone: { type: String, required: true },
    comment: String
});

const registrationSchema = new Schema({
    beenThisYear: { type: Boolean, required: true },
    periodSelected: { type: String, enum: ['first', 'second'] },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: addressSchema, required: true },
    participantsNumber: { type: {
        adults: { type: Number, required: true },
        children: { type: Number, required: true },
        // computed field, should be equal to the sum of adults and children
        // sum: Number,
    }, required: true },
    participants: [participantsSchema],
});

registrationSchema.virtual('participantsNumber.sum').get(function() {
    return this.participantsNumber.adults + this.participantsNumber.children;
});

export default model('Registration', registrationSchema);
