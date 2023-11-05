import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserEntity } from '@app/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();

    // console.log('newUser', newUser);
    // UserEntity {}

    Object.assign(newUser, createUserDto);

    // console.log('newUser ==> ', newUser);

    // UserEntity {
    // username: 'Ihor',
    // email: 'ihor@gmail.com',
    // password: '123'
    //   }

    return await this.userRepository.save(newUser);
  }
}
