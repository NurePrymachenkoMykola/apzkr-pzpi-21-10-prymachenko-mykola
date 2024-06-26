import { Injectable } from '@nestjs/common';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import {TimetableRepository} from "./repositories/timetable.repository";
import {DeleteTimetableDto} from "./dto/delete-timetable.dto";
import {Timetable} from "../schemas/timetable.schema";
import {FindTimetableDto} from "./dto/find-timetable.dto";
import {CreateGameDto} from "../game/dto/create-game.dto";
import {GameService} from "../game/game.service";
import {UpdateGameDto} from "../game/dto/update-game.dto";

@Injectable()
export class TimetableService {

    constructor(
        private timetableRepository: TimetableRepository,
        private gameService: GameService
    ) {
    }
    async create(createTimetableDto: CreateTimetableDto) {
        const newTimetable = await this.timetableRepository.create(createTimetableDto);
        return newTimetable;
    }

    async find(findTimetableDto?: FindTimetableDto) {
        const timetables: Timetable[] = await this.timetableRepository.find(findTimetableDto);
        return timetables;
    }

    async findOne(id: string) {
        const timetable: Timetable = await this.timetableRepository.findOne({id});
        const games = await this.gameService.find({IDs: timetable.games.map(item => item.toString())})
        return {timetable, games};
    }

    async update(id: string, updateTimetableDto: UpdateTimetableDto) {
        const result = await this.timetableRepository.update({id}, updateTimetableDto);
        return result;
    }

    async delete(deleteTimetableDto: DeleteTimetableDto) {
        const result = await this.timetableRepository.delete(deleteTimetableDto);
        return result;
    }

    async addGame(timetableId: string, createGameDto: CreateGameDto) {
        const game = await this.gameService.create(createGameDto);
        const result = await this.timetableRepository.addGame(timetableId, game);
        return result;
    }

    async deleteGame(id: string) {
        const resultDeletingFromTimetable = await this.timetableRepository.deleteGame(id);
        const result = await this.gameService.delete({id});
        return result;
    }

    async updateGame(id: string, updateGameDto: UpdateGameDto) {
        const result = await this.gameService.update(id, updateGameDto);
        return result;
    }
}
