import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CaballosModule } from './caballos/caballos.module';


@Module({
  imports: [
   MongooseModule.forRoot(process.env.MONGO_URI),
  //  MongooseModule.forRoot('mongodb://admin:admin@mongodb:27017/carrera?authSource=admin'),
   CaballosModule,
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
