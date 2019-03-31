import { Body, Controller, HttpException, HttpStatus, Param, Post, UseInterceptors, Get, Put, Delete } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { Result } from "src/modules/backoffice/models/result.model";
import { Product } from "../entities/product.entity";

@Controller('v1/products')
export class ProductController {

    constructor(
        private readonly service: ProductService) {
    }

    @Get()
    async get() {
        try {
            const products = await this.service.get();
            return new Result(null, true, products, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel listar os produtos.', HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body() model: Product) {
        try {
            await this.service.post(model);
            return new Result(null, true, model, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel incluir o produto.', HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async put(@Param('id') id: number, @Body() model: Product) {
        try {
            await this.service.put(id, model);
            return new Result(null, true, model, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel atualizar o produto.', HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            await this.service.delete(id);
            return new Result('Produto deletado com sucesso.', true, null, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel remover o produto.', HttpStatus.BAD_REQUEST);
        }
    }

    public tratarExcessao(error, message: string, status: number) {
        return new HttpException(new Result(message, false, null, error), status);
    }
}