import {Body, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {PlayerService} from "../members/player/player.service";
import {TrainerService} from "../members/trainer/trainer.service";
import {MedicService} from "../members/medic/medic.service";
import {DirectorService} from "../members/director/director.service";
import {MemberAbstractService} from "../members/member.abstract.service";
import {AdminSignInDto, SignInDto} from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import {Roles} from "../schemas/members/member.schema";
import {AdminService} from "../admin/admin.service";
import {AuthRoles} from "../auth-roles";
import {PayloadDto} from "./dto/payload.dto";

@Injectable()
export class AuthService {
    private memberServices: Record<string, MemberAbstractService> = {};

    constructor(
        private jwtService: JwtService,
        private playerService: PlayerService,
        private trainerService: TrainerService,
        private medicService: MedicService,
        private directorService: DirectorService,
        private adminService: AdminService,
    ) {
        this.memberServices[Roles.PLAYER] = this.playerService;
        this.memberServices[Roles.TRAINER] = this.trainerService;
        this.memberServices[Roles.MEDIC] = this.medicService;
        this.memberServices[Roles.DIRECTOR] = this.directorService;
    }
    async signIn(signInDto: SignInDto) {
        try {
            const user = await this.memberServices[signInDto.role].findOne({username: signInDto.username});
            console.log(user, signInDto)
            if (!user) {
                throw new HttpException({error: 'Incorrect username or password'}, HttpStatus.BAD_REQUEST);
            }
            await this.comparePassword(signInDto.password, user.password);

            const payload = {
                username: user.username,
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: Roles[signInDto.role.toUpperCase()],
                clubId: user.clubId,
                id: user._id,
                subscription: user['subscription'] ?? null
            }
            const accessToken = await this.getAccessToken(payload);
            return {
                accessToken,
                payload
            };
        } catch (e) {
            throw new HttpException({error: 'Incorrect username or password'}, HttpStatus.BAD_REQUEST);
        }
    }

    async adminSignIn(adminSignInDto: AdminSignInDto) {
        const admin = await this.adminService.findOne(adminSignInDto.username);

        await this.comparePassword(adminSignInDto.password, admin.password);

        const payload = {
            username: adminSignInDto.username,
            role: AuthRoles.ADMIN
        }

        const accessToken = await this.getAccessToken(payload);
        return {token: accessToken, payload}
    }

    async comparePassword(password: string, hashPassword: string) {
        if (!(await bcrypt.compare(password, hashPassword))) {
            throw new UnauthorizedException('Incorrect login or password!');
        }
    }

    async getAccessToken(payload: PayloadDto) {
        return await this.jwtService.signAsync(payload);
    }

    async retrieve({userId, role}: { userId: string, role: string }) {
        return await this.memberServices[role].findOne({id: userId})
    }
}

