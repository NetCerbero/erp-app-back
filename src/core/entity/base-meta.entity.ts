import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseMeta extends BaseEntity {
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true, select: false })
    deletedAt: Date;
}