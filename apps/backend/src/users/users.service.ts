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

  async searchUser(name: string): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.name like :name', { name: `%${name}%` })
      .limit(5)
      .getMany();
  }

  async findByAddress(address: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ address });
  }

  async findOrCreate(address: string) {
    const user = await this.findByAddress(address);
    if (user) return user;

    return this.usersRepository.create({ address, name: address });
  }

  async setName(address: string, name: string): Promise<User> {
    const user = await this.usersRepository.findOneByOrFail({ address });
    user.name = name;

    await this.usersRepository.save(user);
    return user;
  }
}
