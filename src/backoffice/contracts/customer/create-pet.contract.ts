import { Injectable } from '@nestjs/common';
import { Address } from 'src/backoffice/models/address.model';
import { Flunt } from 'src/utils/flunt';
import { Contract } from '../contract';
import { Pet } from 'src/backoffice/models/pet.model';

@Injectable()
export class CreatePetContract implements Contract {

    errors: any[];

    validate(model: Pet): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.name, 2, 'Nome Invalido');
        flunt.hasMinLen(model.gender, 3, 'Genero Invalido');
        flunt.hasMinLen(model.kind, 3, 'Tipo Invalido');
        flunt.hasMinLen(model.brand, 3, 'Raça Invalida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}