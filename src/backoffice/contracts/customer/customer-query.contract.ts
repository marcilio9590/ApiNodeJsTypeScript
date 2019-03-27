import { Injectable } from '@nestjs/common';
import { Address } from 'src/backoffice/models/address.model';
import { Flunt } from 'src/utils/flunt';
import { Contract } from '../contract';
import { Pet } from 'src/backoffice/models/pet.model';
import { QueryDto } from 'src/backoffice/dtos/query.dto';

@Injectable()
export class CustomerQueryContract implements Contract {

    errors: any[];

    validate(model: QueryDto): boolean {
        const flunt = new Flunt();
        flunt.haxMax(model.take, 1000, 'Solicitação de Registros Maior do que o Permitido.');

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}