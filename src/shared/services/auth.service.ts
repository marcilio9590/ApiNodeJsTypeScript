import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { AccountService } from "src/modules/backoffice/services/account.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService
    ) { }

    async createToken() {
        const user: JwtPayload = { username: 'test@email.com' };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: 3600,
            accessToken
        }
    }

    async validateUser(pauload: JwtPayload): Promise<any> {
        return await this.accountService.findOneByUsername(pauload.username);
    }
}