import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe} from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import {CreateLetterDto} from "../../notifications/letter/dto/create-letter.dto";
import {Public} from "../../auth/decorators/public.decorator";
import {CreateClubDto} from "../../club/dto/create-club.dto";

@Controller('director')
export class DirectorController {
    constructor(
        private readonly directorService: DirectorService
    ) {}

    @Public()
    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() createDirectorDto: CreateDirectorDto) {
        return await this.directorService.create(createDirectorDto);
    }

    @UsePipes(ValidationPipe)
    @Post('club')
    async createClub(@Body() createClubDto: CreateClubDto) {
        return await this.directorService.createClub(createClubDto);
    }

    @Get()
    async find() {
        return await this.directorService.find();
    }
    @UsePipes(ValidationPipe)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDirectorDto: UpdateDirectorDto) {
        console.log('update', updateDirectorDto)
        return await this.directorService.update(id, updateDirectorDto);
    }

}
