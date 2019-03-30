import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from '../contract';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';

@Injectable()
export class QueryContract implements Contract {

    errors: any[];

    validate(model: QueryDto): boolean {
        const flunt = new Flunt();
        if (!model.query) {
            model.query = {};
        }
        flunt.isGreaterThan(model.take, 1000, 'Solicitação de Registros Maior do que o Permitido.');

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}