import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { UserModule } from "./app.module";



async function bootstrap() {
 const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
  transport: Transport.TCP,
  options: {
    host: process.env.MICROSERVICE_HOST || '127.0.0.1',
    port: parseInt(process.env.USER_SERVICE_PORT || '3001', 10),
  }
 });
 await app.listen();
 console.log(`✅ User service is running on port ${process.env.USER_SERVICE_PORT || '3001'}`);
 
}   

bootstrap();