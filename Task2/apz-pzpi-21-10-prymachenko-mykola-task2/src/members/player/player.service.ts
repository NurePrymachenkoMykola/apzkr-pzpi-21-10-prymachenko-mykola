import {Injectable} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import {Player} from "../../schemas/members/player.schema";
import {Positions} from "./constants/positions";
import {PlayerRepository} from "./repositories/player.repository";
import {DeletePlayerDto} from "./dto/delete-player.dto";
import {Letter} from "../../schemas/contacts/letter.schema";
import {FindPlayerDto} from "./dto/find-player.dto";
import {MemberAbstractService} from "../member.abstract.service";
import {FindUniqueMemberDto} from "../dto/find-unique-member.dto";
import {hashPassword} from "../../lib/hash-password";

@Injectable()
export class PlayerService implements MemberAbstractService {

    constructor(
        private playerRepository: PlayerRepository,
    ) {}
    async create(createPlayerDto: CreatePlayerDto) {
        const newPlayer = await this.playerRepository.create(createPlayerDto);
        return newPlayer;
    }

    getPositions() {
        return Object.values(Positions);
    }

    async receiveLetter(letter: Letter) {
        const result = await this.playerRepository.addLetter(letter);
        return result && true
    }

    async find(findPlayerDto?: FindPlayerDto) {
        const players: Player[] = await this.playerRepository.find(findPlayerDto);
        return players;
    }

    async findOne(findUniqueMemberDto?:FindUniqueMemberDto) {
        const player = await this.playerRepository.findOne(findUniqueMemberDto);
        return player;
    }

    async update(id: string, updatePlayerDto: UpdatePlayerDto) {
        const result = await this.playerRepository.update({id}, updatePlayerDto);
        return result;
    }

    async delete(deletePlayerDto: DeletePlayerDto) {
        const result = await this.playerRepository.delete(deletePlayerDto);
        return result;
    }

    async joinToClub(playerUsername: string, clubId: string) {
        const result = await this.playerRepository.update(
            {username: playerUsername},
            {clubId}
        );
        return result;
    }

    async removeLetter(receiverUsername: string, letterId: string) {
        const res = this.playerRepository.removeLetter(receiverUsername, letterId);
        return res !== null;
    }

    async changePassword(username: string, oldPass: string, newPass: string) {
        const res = await this.playerRepository.update(
            {username},
            {password: hashPassword(newPass)}
        );

        return res;
    }

    async fireFromClub(id: string){
        const result = await this.playerRepository.update(
            {_id: id},
            {clubId: null}
        );
        return result;
    }
}
