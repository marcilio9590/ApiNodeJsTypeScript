import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from "@nestjs/common";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer.contracts";
import { CreateCustomerDto } from "../dtos/create-customer-dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user.model";

// localhost:3000/v1/customer
@Controller('v1/customers')
export class CustomerController {

    constructor(private readonly accountService: AccountService) {
    }

    @Get()
    get() {
        return new Result(null, true, [], null);
    }

    @Get(':document')
    getById(@Param('document') document) {
        return new Result(null, true, {}, null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(
                new User(model.document, model.password, true)
            );
            return new Result('Cliente Criado com Sucesso', true, user, null);
        } catch (error) {
            return this.getException(error);
        }

    }

    @Put(':document')
    put(@Body() body, @Param('document') document) {
        return new Result('Cliente Alterado com Sucesso', true, body, null);
    }

    @Delete(':document')
    delete(@Param('document') document) {
        return new Result('Cliente Removido com Sucesso', true, null, null);
    }

    public getException(error) {
        return new Result(error.message, false, null, null);
    }
}