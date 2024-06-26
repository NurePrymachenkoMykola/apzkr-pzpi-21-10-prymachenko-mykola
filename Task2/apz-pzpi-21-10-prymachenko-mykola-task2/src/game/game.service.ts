import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import {GameRepository} from "./repositories/game.repository";
import {Game} from "../schemas/game.schema";
import {FindGameDto} from "./dto/find-game.dto";
import {DeleteGameDto} from "./dto/delete-game.dto";

@Injectable()
export class GameService {
    constructor(
       private gameRepository: GameRepository
    ) {}
    async create(createGameDto: CreateGameDto) {
        createGameDto.date = new Date(createGameDto.date).toString();
        const newGame = await this.gameRepository.create(createGameDto);
        return newGame;
    }

    async find(findGameDto?: FindGameDto) {
        const games: Game[] = await this.gameRepository.findAllInTimetable(findGameDto.IDs);
        return games;
    }

    async update(id: string, updateGameDto: UpdateGameDto) {
        console.log(updateGameDto);
        const result = await this.gameRepository.update({id}, updateGameDto);
        return result;
    }

    async delete(deleteGameDto: DeleteGameDto) {
        const result = await this.gameRepository.delete(deleteGameDto);
        return result;
    }
}
