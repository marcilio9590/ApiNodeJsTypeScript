import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { Customer } from "../models/customer.model";

// localhost:3000/v1/customer
@Controller('v1/customers')
export class CustomerController {

    @Get()
    get() {
        return 'Obter os cliente';
    }

    @Get(':document')
    getById(@Param('document') document) {
        return 'Obter o cliente ' + document;
    }

    @Post()
    post(@Body() body: Customer) {
        return body.name;
    }

    @Put(':document')
    put(@Body() body: Customer, @Param('document') document) {
        return {
            customer: document,
            data: body
        };
    }

    @Delete(':document')
    delete(@Param('document') document) {
        return 'Remover o cliente ' + document;
    }
}