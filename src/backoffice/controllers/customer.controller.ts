import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";

// localhost:3000/v1/customer
@Controller('v1/customers')
export class CustomerController {

    @Get()
    get() {
        return new Result(null, true, [], null);
    }

    @Get(':document')
    getById(@Param('document') document) {
        return new Result(null, true, {}, null);
    }

    @Post()
    post(@Body() body: Customer) {
        return new Result('Cliente Criado com Sucesso', true, body, null);
    }

    @Put(':document')
    put(@Body() body: Customer, @Param('document') document) {
        return new Result('Cliente Alterado com Sucesso', true, body, null);
    }

    @Delete(':document')
    delete(@Param('document') document) {
        return new Result('Cliente Removido com Sucesso', true, null, null);
    }
}