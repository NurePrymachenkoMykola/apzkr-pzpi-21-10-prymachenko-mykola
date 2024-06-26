import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import {MedicService} from "../medic/medic.service";
import {Letter} from "../../schemas/contacts/letter.schema";
import {DirectorRepository} from "./repositories/director.repository";
import {Director} from "../../schemas/members/director.schema";
import {MemberAbstractService} from "../member.abstract.service";
import {FindUniqueMemberDto} from "../dto/find-unique-member.dto";
import {LetterService} from "../../notifications/letter/letter.service";
import {ClubService} from "../../club/club.service";
import {hashPassword} from "../../lib/hash-password";
import {CreateClubDto} from "../../club/dto/create-club.dto";
@Injectable()
export class DirectorService implements MemberAbstractService {
    constructor(
        private directorRepository: DirectorRepository,
        @Inject(forwardRef(() => ClubService))
        private clubService: ClubService,
    ) {}
    async create(createDirectorDto: CreateDirectorDto) {
        const newDirector = await this.directorRepository.create(createDirectorDto);
        return newDirector;
    }

    async createClub(createClubDto: CreateClubDto) {
        const club = await this.clubService.create(createClubDto);
        await this.update(createClubDto.directorId, {clubId: club._id.toString()})
        return club;
    }

    async receiveLetter(letter: Letter) {
        const result = await this.directorRepository.addLetter(letter);
        return result && true;
    }

    async find() {
        const directors: Director[] = await this.directorRepository.find();
        return directors;
    }

    async findOne(findUniqueMemberDto?: FindUniqueMemberDto) {
        const director: Director = await this.directorRepository.findOne(findUniqueMemberDto);
        return director;
    }

    async update(id: string, updateDirectorDto: UpdateDirectorDto) {
        const result = await this.directorRepository.update({id}, updateDirectorDto);
        return result;
    }

    async joinToClub(directorUsername: string, clubId: string) {
        const result = await this.directorRepository.update(
            {username: directorUsername},
            {clubId}
        );
        return result;
    }

    async getClub(username: string) {
        const director = await this.findOne({username});
        const club = await this.clubService.findOne(director.clubId);

        return club;
    }

    async removeLetter(receiverUsername: string, letterId: string) {
        const res = this.directorRepository.removeLetter(receiverUsername, letterId);
        return res !== null;
    }

    async changePassword(username: string, oldPass: string, newPass: string) {
        const res = await this.directorRepository.update(
            {username},
            {password: await hashPassword(newPass)}
        );

        return res;
    }

    async fireFromClub(id: string){
        const result = await this.directorRepository.update(
            {_id: id},
            {clubId: null}
        );
        return result;
    }

    async subscribe(id, subscription) {
        const res = await this.directorRepository.update(
            {_id: id},
            {subscription: subscription}
        );

        return res.subscription;
    }
}
