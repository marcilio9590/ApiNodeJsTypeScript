import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { QueryDto } from '../dtos/query.dto';
import { UpdateCustomerDTO } from '../dtos/customer/update-customer.dto';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {
    }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }

    async update(document: string, data: UpdateCustomerDTO): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document }, data);
    }

    async findAll(): Promise<Customer[]> {
        // se utilizar -name o moongose ira trazer todos os campos menos o name
        return await this.model
            .find({}, 'name email document')
            .sort('name')
            .exec();
    }

    async find(document: String): Promise<Customer> {
        return await this.model
            .findOne({ document })
            .populate('user', 'username')
            .exec();
    }

    async query(model: QueryDto): Promise<Customer[]> {
        return await this.model
            .find(
                model.query,
                model.fields,
                { skip: model.skip, limit: model.take }
            )
            .sort(model.sort)
            .exec();
    }
}