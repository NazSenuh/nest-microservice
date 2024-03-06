import { MigrationInterface, QueryRunner } from 'typeorm'

export class Lock1704835993594 implements MigrationInterface {
    name = 'Lock1704835993594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('0', '1')`)
        await queryRunner.query(`ALTER TABLE "users" ADD "status" "public"."users_status_enum" NOT NULL DEFAULT '0'`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`)
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`)
    }
}
