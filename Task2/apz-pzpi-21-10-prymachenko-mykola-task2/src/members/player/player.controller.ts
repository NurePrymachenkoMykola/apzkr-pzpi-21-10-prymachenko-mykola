import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import {Public} from "../../auth/decorators/public.decorator";


@Controller('player')
export class PlayerController {

    constructor(private readonly playerService: PlayerService) {}

    @Public()
    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() createPlayerDto: CreatePlayerDto) {
        return await this.playerService.create(createPlayerDto);
    }

    @Public()
    @Get('positions')
    async positions() {
        return this.playerService.getPositions();
    }

    @Get()
    async find() {
        return await this.playerService.find();
    }

    @Get(':username')
    async findOne(@Param('username') username: string) {
        return await this.playerService.findOne({username});
    }

    @UsePipes(ValidationPipe)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
        return await this.playerService.update(id, updatePlayerDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.playerService.delete({id});
    }
}
