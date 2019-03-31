import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 80 })
    title: String;

    @Column('text')
    description: String;

    @Column('decimal')
    price: number;

    @Column('decimal')
    quantityOnHand: number;
}