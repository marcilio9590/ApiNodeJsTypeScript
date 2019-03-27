import { Body, Controller, HttpException, HttpStatus, Param, Post, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateAddressContract } from "../contracts/customer/create-address.contract";
import { Address } from "../models/address.model";
import { Result } from "../models/result.model";
import { AddressService } from "../services/address.service";
import { AddressType } from "../enums/address-type.enum";

// localhost:3000/v1/addresses
@Controller('v1/addresses')
export class AddressController {

    constructor(
        private readonly service: AddressService) {
    }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillinAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.service.create(document, model, AddressType.Billing);
            return new Result(null, true, model, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel cadastrar o endereço.', HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.service.create(document, model, AddressType.Shipping);
            return new Result(null, true, model, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel cadastrar o endereço.', HttpStatus.BAD_REQUEST);
        }
    }

    public tratarExcessao(error, message: string, status: number) {
        return new HttpException(new Result(message, false, null, error), status);
    }
}