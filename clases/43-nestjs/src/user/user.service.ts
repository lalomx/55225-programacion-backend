import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {
  }

  async create(createUserDto: CreateUserDto) {
    const { first_name, last_name, email, password } = createUserDto;

    const user = await this.model.create({
      firstname: first_name,
      lastname: last_name,
      email,
      password
    })

    console.log(user)

    return { status: 'success', payload: user };
  }

  async findAll() {
    const users = await this.model.find().lean()
    return { status: 'success', payload: users };
  }

  async findOne(id: string) {
    const user = await this.model.find({ _id: id });

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
