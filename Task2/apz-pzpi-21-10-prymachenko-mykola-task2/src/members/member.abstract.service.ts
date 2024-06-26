import {Member, Roles} from "../schemas/members/member.schema";
import {FindUniqueMemberDto} from "./dto/find-unique-member.dto";
import {Letter} from "../schemas/contacts/letter.schema";

export abstract class MemberAbstractService {
    abstract findOne(findUniqueMemberDto?: FindUniqueMemberDto): Promise<Member>
    abstract receiveLetter(letter: Letter): Promise<boolean>
    abstract joinToClub(username: string, clubId: string): Promise<Member>
    abstract fireFromClub(id: string): Promise<Member>
    abstract removeLetter(receiverUsername: string, letterId: string): Promise<boolean>
    abstract changePassword(username: string, oldPass: string, newPass: string): Promise<Member>
}

