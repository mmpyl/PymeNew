import { ConflictException, Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    return this.usersRepository.create({
      email: dto.email.toLowerCase(),
      passwordHash,
      roles: dto.roles ?? [Role.USER],
      datosAdicionales: (dto.datosAdicionales ?? {}) as any,
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email.toLowerCase());
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new ConflictException('Usuario no encontrado');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.email) {
      const existing = await this.usersRepository.findByEmail(dto.email.toLowerCase());
      if (existing && existing.id !== id) throw new ConflictException('Email already registered');
      data.email = dto.email.toLowerCase();
    }
    if (dto.password) {
      data.passwordHash = await bcrypt.hash(dto.password, 12);
      delete data.password;
    }
    return this.usersRepository.update(id, data);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.usersRepository.remove(id);
  }
}
