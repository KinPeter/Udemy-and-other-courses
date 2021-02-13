import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
// import { mongoDb } from '../keys';

const dbUser = process.env.MONGODB_USER; // || mongoDb.name;
const dbPass = process.env.MONGODB_PASS; // || mongoDb.pass;
const dbName = process.env.MONGODB_DB; // || mongoDb.db;

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(`mongodb+srv://${dbUser}:${dbPass}@cluster0-nigfx.mongodb.net/${dbName}?retryWrites=true&w=majority`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
