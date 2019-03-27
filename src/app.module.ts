import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://marcilio:marcilio@cluster0-sjm5q.azure.mongodb.net/nodeTs?retryWrites=true'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
