import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1699183308008 implements MigrationInterface {
    name = 'CreateUsers1699183308008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "bio" SET DEFAULT 'common bio'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT 'common image'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT 'image template'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "bio" SET DEFAULT 'bio template'`);
    }

}
