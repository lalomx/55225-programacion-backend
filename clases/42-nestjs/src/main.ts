import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.engine('handlebars', handlebars.engine()) // registramos handlebars como motor de plantillas
  // app.set('views', path.join(__dirname, '/views')) // el setting 'views' = directorio de vistas
  // app.set('view engine', 'handlebars')
  await app.listen(3000);
}
bootstrap();
