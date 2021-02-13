import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<{id: string}> {
    const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
    return { id: generatedId };
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    return await this.productsService.getProductById(id);
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, prodTitle, prodDesc, prodPrice);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productsService.deleteProduct(id);
  }
}
