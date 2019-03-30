import { Injectable } from '@nestjs/common';
import { Address } from 'src/modules/backoffice/models/address.model';
import { Flunt } from 'src/utils/flunt';
import { Contract } from '../contract';

@Injectable()
export class CreateAddressContract implements Contract {

    errors: any[];

    validate(model: Address): boolean {
        const flunt = new Flunt();
        flunt.isFixedLen(model.zipcode, 8, 'CEP Invalido');
        flunt.hasMinLen(model.street, 2, 'Rua Invalida');
        flunt.hasMinLen(model.neighborhood, 3, 'Bairro Invalido');
        flunt.hasMinLen(model.city, 3, 'Cidade Invalida');
        flunt.isFixedLen(model.country, 3, 'Pais Invalido');
        flunt.isFixedLen(model.state, 2, 'Estado Invalido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}