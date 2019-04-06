import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { AuthService } from "src/shared/services/auth.service";
import { AccountService } from "../services/account.service";
import { Result } from "../models/result.model";
import { AutheticateDto } from "../dtos/account/autheticate.dto";

@Controller('v1/accounts')
export class AccountController {
    constructor(private accountService: AccountService, private authService: AuthService) { }

    @Post('authenticate')
    async authenticate(@Body() model: AutheticateDto): Promise<any> {
        const customer = await this.accountService.authenticate(model.username, model.password);

        if (!customer) {
            throw new HttpException(new Result('Usuário ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);
        }

        if (!customer.user.active) {
            throw new HttpException(new Result('Usuário Inativo', false, null, null), HttpStatus.UNAUTHORIZED);
        }

        const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles);
        return new Result(null, true, token, null);

    }

}