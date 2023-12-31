import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import 'dotenv/config';

import { UserEntity } from '@app/user/user.entity';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { UpdateUserDto } from '@app/user/dto/updateUser.dto';
import { IUserResponse } from '@app/user/types/userResponse.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // функція createUser створює юзера та записує його в БД
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const errorResponse = {
      errors: {},
    };

    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userByEmail) {
      errorResponse.errors['email'] = 'Email is already registered';
    }

    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (userByUsername) {
      errorResponse.errors['username'] = 'Username is already registered';
    }

    if (userByEmail || userByUsername) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = new UserEntity(); // створюється пустий екземпляр UserEntity {}

    Object.assign(newUser, createUserDto); // зараз значення юзера = payload

    return await this.userRepository.save(newUser); // за допомогою репозиторія тепер повертається entity доповнена за допомогою payload
  }

  // функція login перевіряє, чи є юзер у БД та повертає його
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const errorResponse = {
      errors: { 'email or password': 'Credentials are invalid' },
    };

    const userByEmail = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'username', 'email', 'bio', 'image', 'password'],
    });

    if (!userByEmail) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      userByEmail.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    delete userByEmail.password;

    return userByEmail;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);
    const updatedUser = { ...user, ...updateUserDto };

    return await this.userRepository.save(updatedUser);
  }

  // функція findUserById повертає дані залогіненого юзера після того як токен пройшов перевірку та ми отримали id юзера. Використовуємо у мідлварі.
  async findUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  // функція generateJwt створює та повертає токен
  generateJwt(user: UserEntity): string {
    const { id, username, email } = user;

    return sign({ id, username, email }, process.env.JWT_SECRET);
  }

  // функція buildUserResponse формує та повертає відповідь для фронтенда у необхідному вигляді
  buildUserResponse(user: UserEntity): IUserResponse {
    return { user: { ...user, token: this.generateJwt(user) } };
  }
}
