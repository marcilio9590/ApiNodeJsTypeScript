import { Customer } from '../models/customer.model';
import { Contract } from './contract';
import { Flunt } from 'src/utils/flunt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCustomerContract implements Contract {

    errors: any[];

    validate(model: Customer): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.name, 5, 'Nome Invalido');
        flunt.isEmail(model.email, 'E-mail Invalido');
        flunt.isFixedLen(model.document, 11, 'CPF Invalido');
        flunt.hasMinLen(model.password, 6, 'Senha Invalida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}