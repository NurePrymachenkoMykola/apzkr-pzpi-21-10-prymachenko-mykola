import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {CreateAdminDto} from './dto/create-admin.dto';
import {UpdateAdminDto} from './dto/update-admin.dto';
import {MedicService} from "../members/medic/medic.service";
import {PlayerService} from "../members/player/player.service";
import {LetterService} from "../notifications/letter/letter.service";
import {MailService} from "../notifications/mail/mail.service";
import {AdminRepository} from "./repositories/admin.repository";
import {Admin} from "../schemas/admin.schema";
import {hashPassword} from "../lib/hash-password";
import {RedisClientType} from "redis";
import {Roles} from "../auth/decorators/roles.decorator";
import {AuthRoles} from "../auth-roles";
import {SubscriptionService} from "../subscription/subscription.service";

@Injectable()
export class AdminService {
    constructor(
        private medicService: MedicService,
        private adminRepository: AdminRepository,
        private subscriptionService: SubscriptionService,
        private playerService: PlayerService,
        private letterService: LetterService,
        private mailService: MailService,
    ) {}
    async create(createAdminDto: CreateAdminDto) {
        const candidate = await this.findOne(createAdminDto.username);
        if (candidate) {
            throw new HttpException('Admin with such a username already exist', HttpStatus.CONFLICT);
        }
        createAdminDto.password = await hashPassword(createAdminDto.password);
        const newAdmin = await this.adminRepository.create(createAdminDto);
        return newAdmin;
    }

    async find() {
        const admins: Admin[] = await this.adminRepository.find();
        return admins;
    }

    async findOne(username: string) {
        const admin: Admin = await this.adminRepository.findOne({username});
        return admin;
    }

    async update(id: string, updateAdminDto: UpdateAdminDto) {
        const candidate = await this.findOne(updateAdminDto.username);
        if (candidate) {
            throw new HttpException('Admin with such a username already exist', HttpStatus.CONFLICT);
        }
        updateAdminDto.password = await hashPassword(updateAdminDto.password);

        const result = await this.adminRepository.update({id}, updateAdminDto);
        return result;
    }

    async setSubscriptionPrice(price: number) {
        return await this.subscriptionService.setPrice(price);
    }
}
