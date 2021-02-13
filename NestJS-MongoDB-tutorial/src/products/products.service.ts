import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductDocument, Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, DocumentQuery } from 'mongoose';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductDocument>,
  ) {}

  async insertProduct(title: string, description: string, price: number): Promise<string> {
    const newProduct = new this.productModel({
      title,
      description,
      price,
    });
    const savedProduct = await newProduct.save();
    return savedProduct.id;
  }

  async getProducts(): Promise<Product[]> {
    const result = await this.productModel.find().exec();
    return result.map((prod) => new Product(prod.id, prod.title, prod.description, prod.price));
  }

  async getProductById(id: string): Promise<Product> {
    const prod = await this.findProduct(id);
    return new Product(prod.id, prod.title, prod.description, prod.price);
  }

  async updateProduct(id: string, title: string, description: string, price: number): Promise<Product> {
    const product = await this.findProduct(id);
    if (title) { product.title = title; }
    if (description) { product.description = description; }
    if (price) { product.price = price; }
    await product.save();
    return new Product(product.id, product.title, product.description, product.price);
  }

  async deleteProduct(id: string): Promise<void> {
    let result: any;
    try {
      result = await this.productModel.deleteOne({_id: id}).exec();
    } catch (error) {
      throw new NotFoundException();
    }
    if (result.n === 0) {
      throw new NotFoundException();
    }
  }

  private async findProduct(id: string): Promise<DocumentQuery<ProductDocument, ProductDocument, {}>> {
    let product: any;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException();
    }
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }
}
