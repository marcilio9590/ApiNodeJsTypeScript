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
        const user: JwtPayload = {
            document: '12345678901',
            email: "teste@test.com",
            image: 'assets/images/user.jpg',
            roles: ['admin']
        };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: 3600,
            accessToken
        }
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        //let user = await this.accountService.findOneByUsername(payload.document);
        return payload;
    }
}