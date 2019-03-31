import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { StoreModule } from 'src/modules/store/store.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://marcilio:marcilio@cluster0-sjm5q.azure.mongodb.net/nodeTs?retryWrites=true'),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '35.222.205.19',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'node_ts_store',
      entities: [__dirname + '**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    BackofficeModule,
    StoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
