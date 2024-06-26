import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseFilters} from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import {SubscriptionDto} from "./dto/subscription.dto";
import {CreateGameDto} from "../game/dto/create-game.dto";
import {UpdateGameDto} from "../game/dto/update-game.dto";
import {NestedValidationExceptionFilter} from "../lib/exception-filters/nested-validation-exception.filter";
import {Public} from "../auth/decorators/public.decorator";

@Controller('club')
export class ClubController {
    constructor(private readonly clubService: ClubService) {}

    @Get()
    findAll() {
        /*const season = new Date().getFullYear();
        const date = new Date();
        let date2 = new Date();
        date2.setFullYear(date.getFullYear() + 2);
        return {
            date,
            date2
        };*/
        /*const date = new Date();
        console.log(date);
        console.log(date.toTimeString());
        console.log(date.toISOString());
        console.log(date.toDateString());
        console.log(date.toString())*/
        return this.clubService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clubService.findOne(id);
    }

    @UsePipes(ValidationPipe)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
        return this.clubService.update(id, updateClubDto);
    }


    @UseFilters(NestedValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    @Post('subscription')
    async subscribe(@Body() subscription: SubscriptionDto) {
        return await this.clubService.subscribe(subscription);
    }

    @Public()
    @Get('subscription/get')
    async getSubscription() {
        return await this.clubService.getSubscription() + '$';
    }

    @Post('verification')
    async checkSubscription(@Body('subscription') subscription: string) {
        const res = await this.clubService.checkSubscription(subscription);
        return res;
    }

    @Public() // test
    @UseFilters(NestedValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    @Post('game')
    async addGame(@Body() createGameDto: CreateGameDto) {
        console.log('cgd', createGameDto);
        return await this.clubService.addGame(createGameDto);
    }

    @Public() // test
    @Delete('game/:id')
    async deleteGame(@Param('id') id: string) {
        console.log(id);
        return await this.clubService.deleteGame(id);
    }

    @UsePipes(ValidationPipe)
    @Patch('game/:id')
    async updateGame(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
        return await this.clubService.updateGame(id, updateGameDto);
    }

    @Public() // test
    @Get(':id/timetable')
    async getTimetable(@Param('id') id: string) {
        return await this.clubService.getTimetable(id);
    }
}
