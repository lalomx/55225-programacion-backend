import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private products: Product[];

  constructor() {
    this.products = [];
  }

  create(createProductDto: CreateProductDto) {
    const id = (this.products[this.products.length - 1]?.id || 0) + 1;
    const product = {
      ...createProductDto,
      id,
    };

    this.products.push(product);

    return { status: 'success', payload: product };
  }

  findAll() {
    return { status: 'success', payload: this.products };
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
