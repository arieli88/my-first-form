import { Schema, model, connect } from 'mongoose';

const addressSchema = new Schema({
    city: { type: String, required: true },
    neighbored: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },

}, {
    _id: false,
    versionKey: false

})
const creditCardSchema = new Schema({
    ownerName: { type: String, required: true },
    ownerId: { type: String, required: true },
    cardType: { type: String, required: true },
    cardNumber: { type: String, required: true },
    cvv: {
        type: String, required: true,
        validate: {
            validator: function (v) {
                return /^\d{3}$/.test(v);
            },
            message: props => `${props.value} is not a valid cvv number!`
        }
    },
    expired: { type: String, required: true }, //(mm/yyyy)
}, {
    _id: false,
    versionKey: false

})

const participantsSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    relationship: { type: String, required: true },
    phone: { type: String, required: true },
    comment: String
}, {
    _id: false,
    versionKey: false

});

const registrationSchema = new Schema({
    // 1
    beenThisYear: { type: Boolean, required: true },
    // 2
    periodSelected: { type: String, enum: ['first', 'second'] },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cellPhone: { type: String, required: true },
    homePhone: { type: String, required: false },
    // 3
    address: { type: addressSchema, required: true },
    participantsNumber: {
        type: {
            adults: { type: Number, required: true },
            children: { type: Number, required: true },
            // computed field, should be equal to the sum of adults and children
            // sum: Number,
        }, required: true
    },
    // 4
    participants: [participantsSchema],
    // 5
    forceKind: { type: String, required: true },
    // 6 פרטי החלל
    deceased: {
        type: new Schema({
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
        }, {
            _id: false,
            versionKey: false

        }), required: true
    },
    // 7
    limitMedicals: { type: String },
    // 8
    specialRequest: { type: String },
    // 9
    shuttle: { type: String, enum: ['Tel-Aviv', 'Haifa', 'Jerusalem', 'Ber-sheva'], default: null },
    // 10
    creditCard: { type: creditCardSchema, required: true },
    
    paymentAmountApproval: { type: String, required: true },
    

}, { timestamps: true });

registrationSchema.virtual('participantsNumber.sum').get(function () {
    console.log("סכום המשתתפים מבוגרים וילדים")
    return this.participantsNumber.adults + this.participantsNumber.children
});

export default model('Registration', registrationSchema)

