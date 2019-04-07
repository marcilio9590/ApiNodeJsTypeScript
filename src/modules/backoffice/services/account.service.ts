import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';

@Injectable()
export class AccountService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Customer') private readonly customerModel: Model<Customer>
    ) { }

    async create(data: User): Promise<User> {
        const user = new this.userModel(data);
        return await user.save();
    }

    async getCustomer(document: string) {
        return await this.customerModel.findOne({
            document: document
        })
            .populate('user', '-password')
            .exec();
    }

    async findByUsername(username): Promise<User> {
        return await this.userModel
            .findOne({ username: username })
            .exec();
    }

    async findByUsernamePassword(username, password): Promise<User> {
        return await this.userModel
            .findOne({
                username: username,
                password: password
            })
            .exec();
    }

    async remove(id: String): Promise<User> {
        return await this.userModel.remove(id);
    }

    async update(username: string, data: any): Promise<User> {
        return await this.userModel.findOneAndUpdate({ username }, data);
    }

    async authenticate(user: User): Promise<Customer> {
        return await this.customerModel
            .findOne(
                {
                    user: user,
                }
            )
            .exec();
    }

}