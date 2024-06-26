import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {LoginAdminDto} from "./dto/login-admin.dto";
import {Public} from "../auth/decorators/public.decorator";
import {Roles} from "../auth/decorators/roles.decorator";
import {AuthRoles} from "../auth-roles";

@Roles(AuthRoles.ADMIN)
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() createAdminDto: CreateAdminDto) {
        return await this.adminService.create(createAdminDto);
    }
    @Get()
    async find() {
        return await this.adminService.find();
    }

    @UsePipes(ValidationPipe)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
        console.log(2);
        return await this.adminService.update(id, updateAdminDto);
    }

    @Post('subscription')
    async setSubscriptionPrice(@Body('price') price: number) {
        return await this.adminService.setSubscriptionPrice(price);
    }
}
