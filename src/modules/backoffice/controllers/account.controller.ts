import { Controller, Post, Body, HttpException, HttpStatus, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "src/shared/services/auth.service";
import { AccountService } from "../services/account.service";
import { Result } from "../models/result.model";
import { AutheticateDto } from "../dtos/account/autheticate.dto";
import { ResetPasswordDto } from "../dtos/account/reset-password.dto";
import { Guid } from 'guid-typescript';
import { request } from "https";
import { ChangePasswordDto } from "../dtos/account/change-password.dto";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";

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

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            // TODO: encriptar senha
            await this.accountService.update(request.body.document, { password: model.newPassword });
            return new Result('Sua senha foi alterada com sucesso', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível alterar sua senha', false, null, null), HttpStatus.NOT_MODIFIED);
        }
    }

}