import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import FirstMiddleware from './middlewares/first.middleware';
import ProductMiddleware from './middlewares/product.middleware';

@Module({
  imports: [
    UserModule,
    ProductModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get('MONGO_URL'),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });

    consumer.apply(ProductMiddleware).forRoutes({
      path: '/product',
      method: RequestMethod.ALL,
    });
  }
}
