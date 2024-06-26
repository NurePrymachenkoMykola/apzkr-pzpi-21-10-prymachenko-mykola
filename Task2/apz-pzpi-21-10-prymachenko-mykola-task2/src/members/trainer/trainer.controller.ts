import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import {CreateLetterDto} from "../../notifications/letter/dto/create-letter.dto";
import {CreateGameDto} from "../../game/dto/create-game.dto";
import {Public} from "../../auth/decorators/public.decorator";

@Controller('trainer')
export class TrainerController {
    constructor(private readonly trainerService: TrainerService) {
    }

    @Public()
    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() createTrainerDto: CreateTrainerDto) {
        return await this.trainerService.create(createTrainerDto);
    }

    @Get()
    async find() {
        return await this.trainerService.find();
    }
    @UsePipes(ValidationPipe)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
        return await this.trainerService.update(id, updateTrainerDto);
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.trainerService.delete({id});
    }

}
