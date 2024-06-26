import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Admin} from "../../schemas/admin.schema";
import {EntityRepository} from "../../lib/global/repositories/entity.repository";

@Injectable()
export class AdminRepository extends EntityRepository<Admin> {
    constructor(
        @InjectModel(Admin.name) private adminModel: Model<Admin>
    ) {
        super(adminModel);
    }
}
