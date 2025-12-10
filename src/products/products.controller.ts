import { Controller, Post, Get, Delete, Patch, Body, Inject, Query, ParseIntPipe } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { string } from 'joi';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto, RpcCustomExceptionFilter } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { error } from 'console';


@Controller()
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ){}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto){
    return this.productsClient.send(
      { cmd: 'create_product' },
      createProductDto
    )
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto){
    return this.productsClient.send(
      {cmd : 'Find all products '},
      paginationDto
    );
  }

  @Get(':id')
  async findOne(@Param('id') id:String){
    try {
      const product = await firstValueFrom(
        this.productsClient.send(
          {cmd: 'Find product'},
          { id }
        )
      );
      return product;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Delete(':id')
  delateProduct(@Param('id')id:string){
    return this.productsClient.send(
      {cmd: 'delete_product'},
      {id}
    ).pipe(
      catchError(error => {
        throw new RpcException(error);
      })
    )
  }

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto){
    return this.productsClient.send(
      {cmd: 'update_product'},
      {id, ...updateProductDto}
    ).pipe(
      catchError(error => {
        throw new RpcException(error);
      })
    )
  }
}
