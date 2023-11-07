import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsernameToUserEntity1699190341528 implements MigrationInterface {
    name = 'AddUsernameToUserEntity1699190341528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

}
