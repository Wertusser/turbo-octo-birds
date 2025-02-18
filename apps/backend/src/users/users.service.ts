import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

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
    const addr = address.toLowerCase();
    return this.usersRepository.findOneBy({ address: addr });
  }

  async findOrCreate(address: string) {
    const addr = address.toLowerCase();
    const user = await this.findByAddress(addr);
    if (user) return user;

    return this.usersRepository.save({ address: addr, name: addr.slice(0, 8) });
  }

  async setName(address: string, name: string): Promise<User> {
    const addr = address.toLowerCase();
    const user = await this.usersRepository.findOneByOrFail({ address: addr });
    user.name = name;

    await this.usersRepository.save(user);
    return user;
  }
}
