import { stringify } from "querystring";

export class AutheticateDto {
    constructor(
        public username: string,
        public password: string,
    ) { }
}