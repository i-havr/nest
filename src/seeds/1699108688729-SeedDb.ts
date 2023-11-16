import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1699108688729 implements MigrationInterface {
  name = 'SeedDb1699108688729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );
    await queryRunner.query(
      // password is 1234
      `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$o78pjENbI24NTnrRuDCSSeIPb.RJOkdrg.ZJrZRtIkik2BqGwpEU2')`,
    );
    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article title', 'first article description', 'first article body', 'cofee, dragons', 1)`,
    );
    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article title', 'second article description', 'second article body', 'cofee, dragons', 1)`,
    );
  }

  public async down(): Promise<void> {}
}
