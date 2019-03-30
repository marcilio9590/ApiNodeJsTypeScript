import { Contract } from '../contract';
import { Flunt } from 'src/utils/flunt';
import { Injectable } from '@nestjs/common';
import { CreditCard } from '../../models/credit-card.model';

@Injectable()
export class CreateCreditCardContract implements Contract {

    errors: any[];

    validate(model: CreditCard): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.holder, 5, 'Nome do Cartão Inválido');
        flunt.isFixedLen(model.number, 16, 'Numero do Cartão inválido');
        flunt.isFixedLen(model.expiration, 4, 'Data de expiração do cartão invalida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}