import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get()
    findAll(@Query('role') role?: 'INTERN' | 'HR' | 'DEV' | 'ADMIN'): string[]{
        return []
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return id
    }

    @Post()
    create(@Body() user: {}): {} {
        return user
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() user: {}): {} {
        return { id, ...user }
    }

    @Delete(':id')
    delete(@Param('id') id: string): boolean{
        return true
    }

}
