import {Letter} from "../../schemas/contacts/letter.schema";
import {MedicRepository} from "./repositories/medic.repository";
import {UpdateMedicDto} from "./dto/update-medic.dto";
import {CreateMedicDto} from "./dto/create-medic.dto";
import {DeleteMedicDto} from "./dto/delete-medic.dto";
import {Medic} from "../../schemas/members/medic.schema";
import {MemberAbstractService} from "../member.abstract.service";
import {FindUniqueMemberDto} from "../dto/find-unique-member.dto";
import {hashPassword} from "../../lib/hash-password";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MedicService implements MemberAbstractService {
    constructor(
        private medicRepository: MedicRepository,
    ) {}
    async create(createMedicDto: CreateMedicDto) {
        const newMedic = await this.medicRepository.create(createMedicDto);
        return newMedic;
    }


    async receiveLetter(letter: Letter) {
        const result = await this.medicRepository.addLetter(letter);
        return result && true;
    }

    async find() {
        const medics: Medic[] = await this.medicRepository.find();
        return medics;
    }

    async findOne(findUniqueMemberDto?: FindUniqueMemberDto) {
        const medic: Medic = await this.medicRepository.findOne(findUniqueMemberDto);
        return medic;
    }

    async update(id: string, updateMedicDto: UpdateMedicDto) {
        const result = await this.medicRepository.update({id}, updateMedicDto);
        return result;
    }

    async delete(deleteMedicDto: DeleteMedicDto) {
        const result = await this.medicRepository.delete(deleteMedicDto);
        return result;
    }

    async joinToClub(medicUsername: string, clubId: string) {
        const result = await this.medicRepository.update(
            {username: medicUsername},
            {clubId}
        );
        return result;
    }

    async removeLetter(receiverUsername: string, letterId: string) {
        const res = this.medicRepository.removeLetter(receiverUsername, letterId);
        return res !== null;
    }

    async changePassword(username: string, oldPass: string, newPass: string) {
        const res = await this.medicRepository.update(
            {username},
            {password: hashPassword(newPass)}
        );

        return res;
    }

    async fireFromClub(id: string){
        const result = await this.medicRepository.update(
            {_id: id},
            {clubId: null}
        );
        return result;
    }
}
