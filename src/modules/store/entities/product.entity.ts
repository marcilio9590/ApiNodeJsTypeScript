import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: 'products'
})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 80 })
    title: StaticRange;

    @Column('text')
    description: String;
}