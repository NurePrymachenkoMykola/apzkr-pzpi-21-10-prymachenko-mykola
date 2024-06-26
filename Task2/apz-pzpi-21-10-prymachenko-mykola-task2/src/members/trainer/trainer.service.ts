import {Injectable} from '@nestjs/common';
import {Letter} from "../../schemas/contacts/letter.schema";
import {TrainerRepository} from "./repositories/trainer.repository";
import {Trainer} from "../../schemas/members/trainer.schema";
import {CreateTrainerDto} from "./dto/create-trainer.dto";
import {UpdateTrainerDto} from "./dto/update-trainer.dto";
import {DeleteTrainerDto} from "./dto/delete-trainer.dto";
import {ClubService} from "../../club/club.service";
import {MemberAbstractService} from "../member.abstract.service";
import {FindUniqueMemberDto} from "../dto/find-unique-member.dto";
import {hashPassword} from "../../lib/hash-password";

@Injectable()
export class TrainerService implements MemberAbstractService {
    constructor(
        private clubService: ClubService,
        private trainerRepository: TrainerRepository,
    ) {}
    async create(createTrainerDto: CreateTrainerDto) {
        const newTrainer = await this.trainerRepository.create(createTrainerDto);
        return newTrainer;
    }


    async receiveLetter(letter: Letter) {
        const result = await this.trainerRepository.addLetter(letter);
        return result && true;
    }

    async find() {
        const trainers: Trainer[] = await this.trainerRepository.find();
        return trainers;
    }

    async findOne(findUniqueMemberDto?: FindUniqueMemberDto) {
        const trainer: any = await this.trainerRepository.findOne(findUniqueMemberDto);
        delete trainer.password;
        return trainer;
    }

    async update(id: string, updateTrainerDto: UpdateTrainerDto) {
        const result = await this.trainerRepository.update({id}, updateTrainerDto);
        return result;
    }

    async delete(deleteTrainerDto: DeleteTrainerDto) {
        const result = await this.trainerRepository.delete(deleteTrainerDto);
        return result;
    }

    async joinToClub(trainerUsername: string, clubId: string) {
        const result = await this.trainerRepository.update(
            {username: trainerUsername},
            {clubId}
        );
        return result;
    }

    async removeLetter(receiverUsername: string, letterId: string) {
        const res = this.trainerRepository.removeLetter(receiverUsername, letterId);
        return res !== null;
    }

    async changePassword(username: string, oldPass: string, newPass: string) {
        const res = await this.trainerRepository.update(
            {username},
            {password: hashPassword(newPass)}
        );

        return res;
    }

    async fireFromClub(id: string){
        const result = await this.trainerRepository.update(
            {_id: id},
            {clubId: null}
        );
        return result;
    }
}
