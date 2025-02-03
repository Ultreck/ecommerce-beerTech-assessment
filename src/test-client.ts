import { ClientProxyFactory, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 3001 },
  });

  const response = await client.send({ cmd: 'register' }, {
    name: 'Emmanuel',
    email: 'emma@example.com',
    password: 'secret123'
  }).toPromise();

  console.log('User Created:', response);
}

bootstrap();
