import { Controller, Param, Get, HttpException, HttpStatus, Post, Body } from "@nestjs/common";
import { OrderService } from "src/modules/store/services/order.service";
import { OrderItemService } from "src/modules/store/services/order-item.service";
import { ProductService } from "src/modules/store/services/product.service";
import { Result } from "src/modules/backoffice/models/result.model";
import { OrderItemDto } from "src/modules/store/dtos/order-item.dto";
import { Order } from "../entities/order.entity";
import { OrderItem } from "../entities/order-item.entity";

@Controller('v1/orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly orderItemService: OrderItemService,
        private readonly productService: ProductService
    ) { }

    @Get(':order')
    async get(@Param('order') order: string) {
        try {
            const sOrder = await this.orderService.getByNumber(order);
            return new Result(null, true, sOrder, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel listar o pedido.', HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':customer')
    async getByCustomer(@Param('customer') customer: string) {
        try {
            const order = await this.orderService.getByCustomer(customer);
            return new Result(null, true, order, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel listar o pedido.', HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body() data: OrderItemDto[]) {
        try {
            let order = new Order();
            order.customer = '12345678901'; // vem do token (JWT)
            order.date = new Date();
            order.number = '1B2D3F5';
            order.items = [];
            await this.orderService.post(order);

            for (const item of data) {
                let product = await this.productService.getByID(item.product);
                let orderItem = new OrderItem();
                orderItem.order = order;
                orderItem.product = product;
                orderItem.price = product.price;
                orderItem.quantity = item.quantity;
                await this.orderItemService.post(orderItem);
                product.quantityOnHand -= orderItem.quantity;
                await this.productService.put(product.id, product);
            }
            return new Result(null, true, data, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel criar o pedido.', HttpStatus.BAD_REQUEST);
        }
    }

    public tratarExcessao(error, message: string, status: number) {
        return new HttpException(new Result(message, false, null, error), status);
    }

}