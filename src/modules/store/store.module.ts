import { Module } from '@nestjs/common';
import { ProductController } from 'src/modules/store/controllers/product.controller';
import { ProductService } from 'src/modules/store/services/product.service';
import { Product } from 'src/modules/store/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/modules/store/entities/order.entity';
import { OrderItem } from 'src/modules/store/entities/order-item.entity';
import { OrderService } from 'src/modules/store/services/order.service';
import { OrderItemService } from 'src/modules/store/services/order-item.service';
import { OrderController } from 'src/modules/store/controllers/order.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        Product,
        Order,
        OrderItem
    ])],
    providers: [
        ProductService,
        OrderService,
        OrderItemService
    ],
    controllers: [
        ProductController,
        OrderController
    ],
})
export class StoreModule { }
