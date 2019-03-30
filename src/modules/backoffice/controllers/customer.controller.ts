import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseInterceptors, Put } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer/create-customer.contracts";
import { CreateCustomerDto } from "../dtos/customer/create-customer.dto";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";
import { User } from "../models/user.model";
import { AccountService } from "../services/account.service";
import { CustomerService } from "../services/customer.service";
import { QueryDto } from "../dtos/query.dto";
import { QueryContract } from "../contracts/customer/customer-query.contract";
import { UpdateCustomerContract } from "../contracts/customer/update-customer.contract";
import { async } from "rxjs/internal/scheduler/async";
import { UpdateCustomerDTO } from "../dtos/customer/update-customer.dto";
import { CreateCreditCardContract } from "../contracts/customer/create-credit-card.contract";
import { CreditCard } from "../models/credit-card.model";

// localhost:3000/v1/customers
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

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async update(@Param('document') document, @Body() model: UpdateCustomerDTO) {
        try {
            await this.customerService.update(document, model);
            return new Result(null, true, model, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel atualizar o cliente.', HttpStatus.BAD_REQUEST);
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
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        try {
            const customers = await this.customerService.query(model);
            return new Result(null, true, customers, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel listar os clientes.', HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/credit-cards')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
    async createOrUpdateCreditCard(@Param('document') document, @Body() model: CreditCard) {
        try {
            await this.customerService.saveOrUpdateCreditCard(document, model);
            return new Result(null, true, model, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel adicionar o cartão.', HttpStatus.BAD_REQUEST);
        }
    }

    public tratarExcessao(error, message: string, status: number) {
        return new HttpException(new Result(message, false, null, error), status);
    }
}