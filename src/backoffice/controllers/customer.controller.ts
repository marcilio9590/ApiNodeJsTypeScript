import { Controller } from "@nestjs/common";

@Controller({})
export class CustomerController {
    get() {
        return 'Obter os cliente';
    }
    post() {
        return 'Criar um cliente';
    }
    put() {
        return 'Atualizar um cliente';
    }
    delete() {
        return 'Remover um cliente';
    }
}