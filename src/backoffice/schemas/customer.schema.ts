import * as mongoose from 'mongoose';
import { AddressSchema } from './address.schema';

export const customerSchema = new mongoose.Schema({
    firtsName: {
        type: String,
        required: true,
    },
    lastsName: {
        type: String,
        required: true,
    },
    document: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        }
    },
    pets: [
        {
            name: {
                type: String
            },
            gender: {
                type: String,
                enum: ['male', 'female', 'none']
            },
            kind: {
                type: String
            },
            brand: {
                type: String
            }
        }
    ],
    billingAddress: AddressSchema,
    shippingAddress: AddressSchema,
    card: {
        number: {
            type: String
        },
        holder: {
            type: String
        },
        expiration: {
            type: String
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});