import {Injectable} from "@nestjs/common";
import {PlayerService} from "./player/player.service";
import {TrainerService} from "./trainer/trainer.service";
import {MedicService} from "./medic/medic.service";
import {DirectorService} from "./director/director.service";
import {Roles} from "../schemas/members/member.schema";
import {MemberAbstractService} from "./member.abstract.service";
import {FindMembersDto} from "./dto/find-members.dto";
import {MemberRepository} from "./repositories/member.repository";

@Injectable()
export class MemberService {
    private memberServices: Record<string, MemberAbstractService> = {};

    constructor(
        private memberRepository: MemberRepository,
        private playerService: PlayerService,
        private trainerService: TrainerService,
        private medicService: MedicService,
        private directorService: DirectorService,
    ) {
        this.memberServices[Roles.PLAYER] = this.playerService;
        this.memberServices[Roles.TRAINER] = this.trainerService;
        this.memberServices[Roles.MEDIC] = this.medicService;
        this.memberServices[Roles.DIRECTOR] = this.directorService;
    }

    async find(findMembersDto: FindMembersDto) {
        return await this.memberRepository.getMembers(findMembersDto);
    }

    async findOne(username: string) {
        return await this.memberRepository.getMember(username);
    }

    getMemberService(role: Roles) {
        return this.memberServices[role.toUpperCase()];
    }

    async getClub(username: string) {
        return await this.directorService.getClub(username);
    }

}