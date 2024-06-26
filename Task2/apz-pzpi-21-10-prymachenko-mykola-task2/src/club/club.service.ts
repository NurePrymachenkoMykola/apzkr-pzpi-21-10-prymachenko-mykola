import {forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import {ClubRepository} from "./repositories/club.repository";
import {Club} from "../schemas/club.schema";
import {FindClubDto} from "./dto/find-club.dto";
import {SubscriptionDto} from "./dto/subscription.dto";
import {TimetableService} from "../timetable/timetable.service";
import {CreateGameDto} from "../game/dto/create-game.dto";
import {UpdateGameDto} from "../game/dto/update-game.dto";
import {DeleteGameDto} from "../game/dto/delete-game.dto";
import {LiqPayService} from "../payment/liq-pay/liq-pay.service";
import * as uuid from 'uuid';
import {PaymentService} from "../payment/payment.service";
import {AdmitMemberDto} from "./dto/admit-member.dto";
import {SubscriptionService} from "../subscription/subscription.service";
import {DirectorService} from "../members/director/director.service";

@Injectable()
export class ClubService {

    constructor(
       private clubRepository: ClubRepository,
       private timetableService: TimetableService,
       private paymentService: PaymentService,
       private subscriptionService: SubscriptionService,
       @Inject(forwardRef(() => DirectorService))
       private directorService: DirectorService
    ) {}
    async create(createClubDto: CreateClubDto) {
        const seasonYear = new Date().getFullYear();
        const season = seasonYear + '/' + (seasonYear + 1);
        const timetable = await this.timetableService.create({season});
        const newClub = await this.clubRepository.create({...createClubDto, timetableId: timetable._id.toString()});
        return newClub;
    }

    async findAll(findClubDto?: FindClubDto) {
        const clubs: Club[] = await this.clubRepository.find(findClubDto);
        return clubs;
    }

    async findOne(id: string) {
        const club: Club = await this.clubRepository.findOne({id});
        return club;
    }

    async update(id: string, updateClubDto: UpdateClubDto) {
        const result = await this.clubRepository.update({id}, updateClubDto);
        return result;
    }

    async subscribe(subscription: SubscriptionDto) {
        const orderId = uuid.v4();
        const price = await this.subscriptionService.getPrice();
        const director = await this.directorService.findOne({id: subscription.directorId});
        const newSubscription =  await this.paymentService.processSubscriptionPayment({
            orderId,
            years: subscription.seasons,
            amount: price * subscription.seasons,
            director,
            card: subscription.card
        }, director.subscription);
        const new_subscription = await this.directorService.subscribe(director._id.toString(), newSubscription);
        return new_subscription;
    }

    async getSubscription() {
        return await this.subscriptionService.getPrice();
    }
    async checkSubscription(subscription: string) {
        return this.subscriptionService.verify(subscription);
    }

    async addGame(createGameDto: CreateGameDto) {
        const club = await this.findOne(createGameDto.clubId);
        return await this.timetableService.addGame(club.timetableId.toString(), createGameDto);
    }

    async deleteGame(id: string) {
        return await this.timetableService.deleteGame(id);
    }

    async updateGame(id: string, updateGameDto: UpdateGameDto) {
        return await this.timetableService.updateGame(id, updateGameDto);
    }

    async admitPlayer(admitMemberDto: AdmitMemberDto) {
        return await this.clubRepository.admitPlayer(admitMemberDto)
    }
    async admitTrainer(admitMemberDto: AdmitMemberDto) {
        return await this.clubRepository.update(
            {id: admitMemberDto.clubId},
            {trainerId: admitMemberDto.memberId}
        );
    }
    async admitDirector(admitMemberDto: AdmitMemberDto) {
        return await this.clubRepository.update(
            {id: admitMemberDto.clubId},
            {directorId: admitMemberDto.memberId}
        );
    }
    async admitMedic(admitMemberDto: AdmitMemberDto) {
        return await this.clubRepository.update(
            {id: admitMemberDto.clubId},
            {medicId: admitMemberDto.memberId}
        );
    }

    async firePlayer(clubId: string, player_id: string) {
        return await this.clubRepository.firePlayer(clubId, player_id)
    }
    async fireTrainer(id: string) {
        return await this.clubRepository.update(
            {id},
            {trainerId: null}
        );
    }
    async fireDirector(id: string) {
        return await this.clubRepository.update(
            {id},
            {directorId: null}
        );
    }
    async fireMedic(id: string) {
        return await this.clubRepository.update(
            {id},
            {medicId: null}
        );
    }

    async getTimetable(id: string) {
        const club = await this.clubRepository.findOne({id});
        const timetable = await this.timetableService.findOne(club.timetableId.toString());
        return timetable;
    }
}
