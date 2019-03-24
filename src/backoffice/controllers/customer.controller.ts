import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateAddressContract } from "../contracts/customer/create-address.contract";
import { CreateCustomerContract } from "../contracts/customer/create-customer.contracts";
import { CreateCustomerDto } from "../dtos/create-customer-dto";
import { Address } from "../models/address.model";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";
import { User } from "../models/user.model";
import { AccountService } from "../services/account.service";
import { CustomerService } from "../services/customer.service";
import bodyParser = require("body-parser");

// localhost:3000/v1/customer
@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService) {
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
            const userCreated = await this.accountService.create(
                new User(model.document, model.password, true)
            );
            const customer = new Customer(
                model.name,
                model.document,
                model.email,
                null, null,
                null, null,
                userCreated);
            const customerCreated = await this.customerService.create(customer);

            return new Result('Cliente Criado com Sucesso', true, customerCreated, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel realizer seu cadastro.', HttpStatus.BAD_REQUEST);
        }

    }

    @Post(':document/address/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillinAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.customerService.AddBillingAddress(document, model);
            return new Result(null, true, model, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel cadastrar o endereço.', HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/address/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.customerService.AddShippingAddress(document, model);
            return new Result(null, true, model, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel cadastrar o endereço.', HttpStatus.BAD_REQUEST);
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

    public tratarExcessao(error, message: string, status: number) {
        return new HttpException(new Result(message, false, null, error), status);
    }
}