import { Controller, Post, Body, HttpException, HttpStatus, Req, UseGuards, Get, UseInterceptors } from "@nestjs/common";
import { AuthService } from "src/shared/services/auth.service";
import { AccountService } from "../services/account.service";
import { Result } from "../models/result.model";
import { AutheticateDto } from "../dtos/account/autheticate.dto";
import { ResetPasswordDto } from "../dtos/account/reset-password.dto";
import { Guid } from 'guid-typescript';
import { ChangePasswordDto } from "../dtos/account/change-password.dto";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { AutenticateContract } from "src/shared/contracts/authenticate.contract";

@Controller('v1/accounts')
export class AccountController {
    constructor(private accountService: AccountService, private authService: AuthService) { }

    @Post('authenticate')
    @UseInterceptors(new ValidatorInterceptor(new AutenticateContract()))
    async authenticate(@Body() model: AutheticateDto): Promise<any> {

        const user = await this.accountService.findByUsernamePassword(model.username, model.password);

        if (!user) {
            throw new HttpException(new Result('Usuário ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);
        }

        if (!user.active) {
            throw new HttpException(new Result('Usuário Inativo', false, null, null), HttpStatus.UNAUTHORIZED);
        }
        const customer = await this.accountService.authenticate(user);
        customer.user = user;
        const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles);
        return new Result(null, true, token, null);

    }

    @Post('reset-password')
    async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
        try {
            // TODO: enviar email com a senha
            const password = Guid.create().toString().substring(0, 8).replace('-', '');
            await this.accountService.update(model.document, { password: password });
            return new Result('Uma nova senha foi enviada para o seu e-mail', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível restaurar sua senha', false, null, null), HttpStatus.NOT_MODIFIED);
        }
    }

    // headers -> Authorization
    // Bearer +Token
    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            // TODO: encriptar senha
            await this.accountService.update(request.user.document, { password: model.newPassword });
            return new Result('Sua senha foi alterada com sucesso', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível alterar sua senha', false, null, null), HttpStatus.NOT_MODIFIED);
        }
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    async refreshToken(@Req() request): Promise<any> {
        // gera token
        const token = await this.authService.createToken(request.user.document, request.user.email, request.user.image, request.user.roles);
        return new Result(null, true, token, null);
    }

    @Get('get-customer')
    async getCustomer(@Body() model: any): Promise<any> {
        // gera token
        const customer = await this.accountService.getCustomer(model.document);
        return new Result(null, true, customer, null);
    }


}