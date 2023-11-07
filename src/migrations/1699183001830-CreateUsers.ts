import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1699183001830 implements MigrationInterface {
    name = 'CreateUsers1699183001830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "bio" SET DEFAULT 'bio template'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT 'image template'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "bio" SET DEFAULT ''`);
    }

}
