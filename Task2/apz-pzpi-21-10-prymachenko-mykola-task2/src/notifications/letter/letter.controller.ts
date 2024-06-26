import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {LetterService} from "./letter.service";
import {UpdateLetterDto} from "./dto/update-letter.dto";
import {CreateLetterDto} from "./dto/create-letter.dto";
import {InvitationDto} from "./dto/invitation.dto";
import {StatusDto} from "./dto/status.dto";

@Controller('letter')
export class LetterController {

    constructor(private readonly letterService: LetterService) {}

    @Post()
    async send(@Body() createLetterDto: CreateLetterDto) {
        return await this.letterService.sendLetter(createLetterDto);
    }

    @Post('invitation')
    async invite(@Body() createInvitationDto: InvitationDto) {
        return await this.letterService.invite(createInvitationDto);
    }

    @Get(':username')
    async find(@Param('username') receiverUsername: string) {
        return await this.letterService.find(receiverUsername);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateLetterDto: UpdateLetterDto) {
        return await this.letterService.update(id, updateLetterDto);
    }

    @Patch('status/:id')
    async toggleStatus(@Param('id') id: string, @Body() statusDto: StatusDto) {
        return await this.letterService.toggleStatus(id, statusDto.status);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.letterService.delete({id});
    }

}
