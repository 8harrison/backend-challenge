import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/auth.login.dto';
import { User } from '../entities/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(dto: UserDto) {
    const user = new User(dto);

    return await this.usersRepository.save(this.usersRepository.create(user));
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOneByUsername(username: string) {
    return this.usersRepository.findOne({
      where: { username },
    });
  }
}
