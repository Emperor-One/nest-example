import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    private users = [
        {
            "id": 1,
            "name": "Alice",
            "email": "alice@example.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Bob",
            "email": "bob@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 3,
            "name": "Charlie",
            "email": "charlie@example.com",
            "role": "ADMIN"
        },
        {
            "id": 4,
            "name": "Diana",
            "email": "diana@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 5,
            "name": "Evan",
            "email": "evan@example.com",
            "role": "INTERN"
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): {} {
        if (role) {
            const usersFilteredByRoles = this.users.filter(user => user.role === role)
            if (usersFilteredByRoles.length === 0) throw new NotFoundException('User Role Not Found')

            return usersFilteredByRoles
        }

        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if (!user) {
            throw new NotFoundException('User Not Found')
        }

        return user
    }

    create(createUserDto: CreateUserDto) {
        const newUser = {
            id: this.users.length + 1,
            ...createUserDto
        }

        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto }
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)
        delete this.users[id - 1]

        return removedUser
    }
}
