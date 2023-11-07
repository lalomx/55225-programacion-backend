import { NestMiddleware } from "@nestjs/common";

export default class ProductMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    console.log('Middleware for products')
    next()
  }
}