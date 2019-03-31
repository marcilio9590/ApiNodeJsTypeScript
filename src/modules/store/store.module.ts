import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([
        Product
    ])],
    providers: [
        ProductService
    ],
    controllers: [
        ProductController
    ],
})
export class StoreModule { }
