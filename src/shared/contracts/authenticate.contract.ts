import { Flunt } from 'src/utils/flunt';
import { Injectable } from '@nestjs/common';
import { AutheticateDto } from 'src/modules/backoffice/dtos/account/autheticate.dto';
import { Contract } from 'src/modules/backoffice/contracts/contract';

@Injectable()
export class AutenticateContract implements Contract {

    errors: any[];

    validate(model: AutheticateDto): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.username, 3, 'Username Invalido');
        flunt.hasMinLen(model.password, 3, 'Senha Invalida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}