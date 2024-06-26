import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query} from '@nestjs/common';
import {Public} from "../auth/decorators/public.decorator";
import {FindMembersDto} from "./dto/find-members.dto";
import {MemberService} from "./member.service";
import {ChangePasswordDto} from "./trainer/dto/change-password.dto";

@Controller('member')
export class MemberController {
    constructor(
        private memberService: MemberService
    ) {
    }

    @Post('password')
    async changePassword(@Body() passwordDto: ChangePasswordDto) {
        return await this.memberService
            .getMemberService(passwordDto.role)
            .changePassword(passwordDto.username, passwordDto.oldPassword, passwordDto.newPassword)
    }

    @UsePipes(ValidationPipe)
    @Get()
    async find(@Query() findMembersDto: FindMembersDto) {
        const result = await this.memberService.find(findMembersDto);
        return result;
    }

    @UsePipes(ValidationPipe)
    @Get(':username')
    async findOne(@Param('username') username: string) {
        const member = await this.memberService.findOne(username);
        return member;
    }

    @Public()
    @Get('nations/list')
    async genNations() {
        const geoObjectList = await import('countries-list');
        const countries = geoObjectList.getCountryDataList()
            .map(country => country.name)
            .sort();

        return countries;
    }


}
