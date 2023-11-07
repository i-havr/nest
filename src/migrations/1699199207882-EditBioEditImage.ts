import { MigrationInterface, QueryRunner } from "typeorm";

export class EditBioEditImage1699199207882 implements MigrationInterface {
    name = 'EditBioEditImage1699199207882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "bio" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT 'common image'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "bio" SET DEFAULT 'common bio'`);
    }

}
