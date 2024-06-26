import { Injectable } from '@nestjs/common';
import {Letter} from "../../schemas/contacts/letter.schema";
import {hashPassword} from "../../lib/hash-password";
import {EntityRepository} from "../../lib/global/repositories/entity.repository";

@Injectable()
export class MemberRepositoryGeneric<T> extends EntityRepository<T> {
    constructor(model) {
        super(model);
    }

    async create(createEntityData: unknown): Promise<T> {
        createEntityData['password'] = await hashPassword(createEntityData['password']);
        return super.create(createEntityData);
    }

    async addLetter(letter: Letter) {
        return await this.update(
            {username: letter.receiver.username},
            {$addToSet: { letters: letter}}
        );
    }

    async removeLetter(receiverUsername: string, letterId: string) {

        return await this.update(
            {username: receiverUsername},
            {$pull: { letters: {$in: [letterId]}}}
        );
    }
}
