import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({
    zipcode: {
        type: String
    },
    street: {
        type: String
    },
    number: {
        type: String
    },
    complement: {
        type: String
    },
    neighborhood: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    }
});