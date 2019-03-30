import { Contract } from '../contract';
import { Flunt } from 'src/utils/flunt';
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/customer/create-customer.dto';
import { UpdateCustomerDTO } from '../../dtos/customer/update-customer.dto';

@Injectable()
export class UpdateCustomerContract implements Contract {

    errors: any[];

    validate(model: UpdateCustomerDTO): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.name, 5, 'Nome Invalido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}