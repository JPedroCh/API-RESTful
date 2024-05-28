import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Noticia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descricao: string;
}
