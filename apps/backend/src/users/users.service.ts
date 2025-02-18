import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByName(name: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ name });
  }

  async findByAddress(address: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ address });
  }

  async findOrCreate(address: string) {
    const user = await this.usersRepository.findOneBy({ address });
    if (user) return user;

    return await this.usersRepository.create({ address });
  }

  async setName(address: string, name: string): Promise<User> {
    const user = await this.usersRepository.findOneByOrFail({ address });
    user.name = name;

    await this.usersRepository.save(user);
    return user;
  }
}
