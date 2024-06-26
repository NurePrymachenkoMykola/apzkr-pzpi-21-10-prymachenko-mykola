import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe} from '@nestjs/common';
import {MedicService} from "./medic.service";
import {UpdateMedicDto} from "./dto/update-medic.dto";
import {CreateMedicDto} from "./dto/create-medic.dto";
import {Public} from "../../auth/decorators/public.decorator";

@Controller('medic')
export class MedicController {
    constructor(private readonly medicService: MedicService) {
    }

    @Public()
    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() createMedicDto: CreateMedicDto) {
        return await this.medicService.create(createMedicDto);
    }

    @Get()
    async find() {
        return await this.medicService.find();
    }

    @UsePipes(ValidationPipe)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateMedicDto: UpdateMedicDto) {
        return await this.medicService.update(id, updateMedicDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.medicService.delete({id});
    }

}