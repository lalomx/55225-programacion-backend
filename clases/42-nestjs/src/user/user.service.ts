import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  create(createUserDto: CreateUserDto) {
    const { first_name, last_name, email, password, avatar } = createUserDto;

    const id = (this.users[this.users.length - 1]?.id || 0) + 1;

    const user = { id, first_name, last_name, email, password, avatar };

    this.users.push(user);

    return { status: 'success', payload: user };
  }

  findAll() {
    return { status: 'success', payload: this.users };
  }

  findOne(id: number) {
    const user = this.users.find(({ id: userId }) => userId == id);

    if (!user) {
      throw new HttpException(
        { status: 'failure', message: 'El usuario no existe' },
        HttpStatus.NOT_FOUND,
      );
    }

    return { status: 'success', payload: user };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
