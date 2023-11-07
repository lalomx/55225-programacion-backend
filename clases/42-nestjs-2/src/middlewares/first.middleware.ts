import { NestMiddleware } from '@nestjs/common';

export default class FirstMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    // definir la implementacion
    console.log(`${req.method} en ${req.url} recibo`);
    next();
  }
}
