import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // router.post((req, res) => {
  //   const { query, body, params } = req
  // body{}
  // })

  @Post()
  // @Body, @Query, @Param, @Request
  create(
    @Body() createUserDto: CreateUserDto,
    // @Request() req,
    // @Response() res,
  ) {
    // res.render()
    return this.userService.create(createUserDto);
    // .send()
  }

  @Get()
  findAll(@Query('limit') limit: number) {
    // ?limit=10
    console.log(limit);
    return this.userService.findAll();
  }

  // /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      // lo intenta castear a number
      throw new HttpException(
        { status: 'failure', message: 'El id no es valido' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
