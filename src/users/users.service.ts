import { UserEntity } from './../db/entities/user.entity';
import { UserDto } from './user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import {v4 as uuid} from 'uuid';
import {hashSync as bcryptHashSync} from 'bcrypt';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository} from 'typeorm';

@Injectable()
export class UsersService {
    private readonly users: UserDto[] = [{

            id: '1',
            username: 'user',
            password: ''
        }
    ];

    constructor(
        @InjectRepository(UserEntity) private readonly usersRepository : Repository<UserEntity>
    ) {  }

    async create( newUser: UserDto ) {
        const userAlreadyRegistered = await this.findByUsername(newUser.username);

        if(userAlreadyRegistered) {
            throw new ConflictException(`User ${newUser.username} already registered`);
        }

        const dbUser = new UserEntity();
        dbUser.username = newUser.username;
        dbUser.passwordHash = bcryptHashSync(newUser.password, 10);

        const { id, username } = await this.usersRepository.save( dbUser );

        return { id, username };
    }

    async findByUsername(username: string): Promise<UserDto | null> {
        const userFound = await this.usersRepository.findOne({
            where: { username }
        })

        if(!userFound) {
            return null;
        }

        return {
            id: userFound.id,
            username: userFound.username,
            password: userFound.passwordHash
        }
    }
}
