import { NestMiddleware } from "@nestjs/common";

export default class FirstMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    console.log(`${req.method} at ${req.url} received`)
    next()
  }
}