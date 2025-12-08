import { Controller, Post, Get, Delete, Patch, Body, Inject } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { string } from 'joi';
import { PRODUCT_SERVICE } from 'src/config';


@Controller()
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ){}
  @Post()
  createProduct(){
    return 'crea un Producto'
  }
  @Get()
  findAll(){
    return this.productsClient.send(
      {cmd : 'Find all products '},
      {}
    );
  }
  @Get(':id')
    findOne(@Param('id') id:String){
      return 'Esta funcion regresa el producto ' +id;
  }
  @Delete(':id')
  delateProduct(@Param('id')id:string){
    return 'Esta funcion elimina el Producto' +id;
  }
  @Patch(':id')
  patchProduct(@Param('id')id:string,@Body()body:any){

  }
}
