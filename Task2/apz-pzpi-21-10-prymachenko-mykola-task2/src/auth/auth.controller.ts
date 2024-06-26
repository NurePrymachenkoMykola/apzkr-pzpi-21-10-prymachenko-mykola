import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Response} from 'express';
import {AdminSignInDto, SignInDto} from "./dto/sign-in.dto";
import {Public} from "./decorators/public.decorator";
import {User} from "./decorators/user.decorator";
import {ACCESS_TOKEN} from "./constraints/auth.contraints";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('verify')
    verify(@User() user: any) {
        return user;
    }

    @Post('retrieve')
    retrieve(@Body() {userId, role}: { userId: string, role: string }) {
        console.log(userId, role)
        return this.authService.retrieve({role, userId});
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
        const {accessToken, payload} = await this.authService.signIn(signInDto);
        res.cookie(ACCESS_TOKEN, accessToken, {
            expires: new Date(Date.now() + 3600000)
        })
        return payload;
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Get('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.cookie(ACCESS_TOKEN, '', {
            expires: new Date(0),
        })
        return {
            ok: true
        };
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('admin')
    async adminSignIn(@Body() adminSignInDto: AdminSignInDto, @Res({ passthrough: true }) res: Response) {
        const {token, payload} = await this.authService.adminSignIn(adminSignInDto);
        res.cookie(ACCESS_TOKEN, token, {
            expires: new Date(Date.now() + 3600000)
        })
        return payload;
    }
}


