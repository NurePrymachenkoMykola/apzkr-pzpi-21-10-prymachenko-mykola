import {FilterQuery, Model, UpdateQuery, UpdateWriteOpResult} from "mongoose";
import {FindUniqueMemberDto} from "../../../members/dto/find-unique-member.dto";

export abstract class EntityRepository<T> {
    protected constructor (protected readonly entityModel: Model<T>) {}

    async create (
        createEntityData: unknown
    ): Promise<T> {
        const entity = await this.entityModel.create(createEntityData);
        return entity;
    }

    async find (
        entityFilterQuery?: FilterQuery<T>
    ): Promise<T[] | null> {
        return this.entityModel.find(entityFilterQuery);
    }

    async findOne (
        findUniqueMemberDto?: FindUniqueMemberDto
    ): Promise<T | null> {
        if (!findUniqueMemberDto) {
            return this.entityModel.findOne();
        }
        const filter = {};
        if (findUniqueMemberDto.id) {
            filter['_id'] = findUniqueMemberDto.id;
        }
        if (findUniqueMemberDto.username) {
            filter['username'] = findUniqueMemberDto.username;
        }
        if (findUniqueMemberDto.email) {
            filter['email'] = findUniqueMemberDto.email;
        }
        return this.entityModel.findOne(filter);
    }

    async update (
        entityFilterQuery: FilterQuery<T>,
        updateEntityData: UpdateQuery<unknown>
    ): Promise<T | null> {

        [entityFilterQuery, updateEntityData] = this.refactorQueries(entityFilterQuery, updateEntityData);

        const updatedEntity = await this.entityModel.findOneAndUpdate(
            entityFilterQuery,
            updateEntityData,
            {
                returnDocument: 'after',
            }
        );
        return updatedEntity;
    }

    async updateMany (
        entityFilterQuery: FilterQuery<T>,
        updateEntityData: UpdateQuery<unknown>
    ): Promise<UpdateWriteOpResult> {
        this.refactorQueries(entityFilterQuery, updateEntityData);
        const result = await this.entityModel.updateMany(
            entityFilterQuery,
            updateEntityData,
        );
        return result;
    }

    async delete (
        entityFilterQuery: FilterQuery<T>
    ): Promise<T | null> {
        entityFilterQuery = {...entityFilterQuery, _id: entityFilterQuery.id};
        delete entityFilterQuery.id;
        const deletedEntity = await this.entityModel.findOneAndDelete(entityFilterQuery);
        return deletedEntity;
    }

    private refactorQueries(entityFilterQuery, updateEntityData) {
        if (entityFilterQuery.id) {
            entityFilterQuery = {...entityFilterQuery, _id: entityFilterQuery.id};
            delete entityFilterQuery.id;
        }
        if (updateEntityData.id) {
            updateEntityData = {...updateEntityData, _id: updateEntityData.id};
            delete updateEntityData.id;
        }

        return [entityFilterQuery, updateEntityData];
    }
}