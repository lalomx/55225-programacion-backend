import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Array<Product>

  constructor() {
    this.products = []
  }

  create(createProductDto: CreateProductDto) {
    const last = this.products.slice(-1)[0]
    const id = (last?.id || 0) + 1
    const product = {
      ...createProductDto,
      id
    }

    this.products.push(product)

    return product
  }

  findAll() {
    return this.products
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
