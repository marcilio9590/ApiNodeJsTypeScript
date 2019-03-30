import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer/create-customer.contracts";
import { CreateCustomerDto } from "../dtos/create-customer.dto";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";
import { User } from "../models/user.model";
import { AccountService } from "../services/account.service";
import { CustomerService } from "../services/customer.service";
import { QueryDto } from "../dtos/query.dto";
import { CustomerQueryContract } from "../contracts/customer/customer-query.contract";

// localhost:3000/v1/customer
@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService) {
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

    @Get()
    async getAll() {
        try {
            const customers = await this.customerService.findAll();
            return new Result(null, true, customers, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel listar os clientes.', HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':document')
    async getCustomer(@Param('document') document) {
        try {
            const customer = await this.customerService.find(document);
            return new Result(null, true, customer, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel detalhar o cliente.', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new CustomerQueryContract()))
    async query(@Body() model: QueryDto) {
        try {
            const customers = await this.customerService.query(model);
            return new Result(null, true, customers, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel listar os clientes.', HttpStatus.BAD_REQUEST);
        }
    }

    public tratarExcessao(error, message: string, status: number) {
        return new HttpException(new Result(message, false, null, error), status);
    }
}