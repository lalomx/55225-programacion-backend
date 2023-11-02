import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @Request
  // req.query/params/body
  create(@Body() createUserDto: CreateUserDto) {
    // validar usuario
    if(!createUserDto.first_name) {
      throw new HttpException('Missing first_name', HttpStatus.BAD_REQUEST)
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query) {
    console.log(query)
    const { limit } = query
    console.log(limit)
    const users = this.usersService.findAll();

    return { status: 'success', payload: users }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(+id)) {
      throw new HttpException('Invalid parameter id', HttpStatus.BAD_REQUEST)
    }
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
