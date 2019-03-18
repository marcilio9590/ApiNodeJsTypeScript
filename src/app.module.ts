import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://marcilio:marcilio@cluster0-sjm5q.azure.mongodb.net/test?retryWrites=true'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
